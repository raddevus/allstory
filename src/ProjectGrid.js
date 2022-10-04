import React, { StrictMode } from 'react';
import { Project } from './main.js';
import { projects } from './App';

let allPs = [];
let mountCount = 0;

export class ProjectGrid extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    // looks for a property named allProjects in this.state & this.props
    allPs =
      'allProjects' in this.state
        ? this.state.allProjects
        : this.props.allProjects;
    console.log(`allProjects.length : ${allPs.length}`);

    if (allPs.length == 0) {
      return;
    }

    let allRows = [];
    let rowKey = 0;
    allRows.push(
      <input
        key={`${rowKey++}`}
        type="text"
        id="title"
        placeholder="project title"
      />
    );

    allRows.push(
      <button onClick={this.clickHandler.bind(this)} key={`${rowKey++}`}>
        Add Project
      </button>
    );

    allRows.push(
      <div>
        <select
          id="projectList"
          className="form-select"
          aria-label="Default select example"
          onChange={this.changeHandler.bind(this)}
        >
          <option value=""></option>);
        </select>
      </div>
    );

    allPs.forEach((p) => {
      allRows.push(
        <div key={`${rowKey++}`}>
          <h3>{p.name}</h3>
          <p>{p.id}</p>
        </div>
      );
    });
    return allRows;
  }

  clickHandler() {
    let title = document.querySelector('#title').value;
    if (title === '') {
      return;
    } // don't add if it is a blank
    document.querySelector('#title').value = '';
    let p = new Project(title);
    projects.push(p);
    let projectList = document.querySelector('#projectList');
    projectList.append(new Option(p.name, JSON.stringify(p), false, false));
    this.setState({ allProjects: projects });
  }

  changeHandler(e) {
    // item's properties will match a Project
    let item = JSON.parse(e.target.value);
    console.log(`item.name: ${item.name}`);

    console.log(`item.id ${item.id}`);
  }

  componentDidMount() {
    mountCount++;
    console.log('yeah, mounted!');
    let projectList = document.querySelector('#projectList');
    let optionNames = [...projectList.options].map((o) => o.text);
    console.log(optionNames);
    console.log(`allPs.length : ${allPs.length}`);
    if (mountCount <= 1) {
      allPs.forEach((p) => {
        //console.log(`p.title: ${p.title}`);
        projectList.append(new Option(p.name, JSON.stringify(p), false, false));
      });
    }
  }
}
