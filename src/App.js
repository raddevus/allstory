import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { initUser } from './main.js';
import { ProjectGrid } from './ProjectGrid';
import { Project } from './main';

let localUser = null;

let p1 = new Project('auto-gen');

export let projects = [];

projects.push(p1);
projects.push(new Project('test-2'));
console.log(`projects.length : ${projects.length}`);

export default function App() {
  initUser();
  return (
    <div>
      <h1>AllStory</h1>
      <p>Track all your User Stories for all your projects.</p>
      <div id="projects"></div>
      
      <ProjectGrid allProjects={projects} />
    </div>
  );
}
