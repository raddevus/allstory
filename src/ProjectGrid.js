import React, { StrictMode } from 'react';
import { Project } from './main.js';
import { projects } from './App';
export class ProjectGrid extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    // looks for a property named allProjects in this.state & this.props
    const allPs =
      'allProjects' in this.state ? this.state.allProjects : this.props.allProjects;
    console.log(`allProjects.length : ${allPs.length}`);
    if (allPs.length == 0) {
      return;
    }

    let allRows = [];
    let rowKey = 0;
    allRows.push(<input type="text" id="title" placeholder="project title" />);
    allRows.push(
      <button onClick={this.clickHandler.bind(this)}>Add Project</button>
    );

    allPs.forEach((p) => {
      allRows.push(
        <div key={rowKey++}>
          <h3>{p.name}</h3>
          <p>{p.id}</p>
        </div>
      );
    });
    return allRows;
  }

  clickHandler() {
    let title = document.querySelector('#title').value;
    if (title === ""){return;} // don't add if it is a blank
    document.querySelector('#title').value = '';
    projects.push(new Project(title));
    this.setState({ allProjects: projects });
  }
}
