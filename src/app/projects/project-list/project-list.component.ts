import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.module';
import { PROJECTS } from '../shared/mock-projects';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = PROJECTS;
  constructor() { }

  ngOnInit() {
  }

  onEdit(project){
    project.originalProject = Object.assign( {}, project);
    project.editing = true;
    console.log("called onEdit")  ;
    console.log(project.name)
  
  }

  onCancel(project){
    event.preventDefault();
    this.projects[this.projects.indexOf(project)] = project.originalProject;
    project.editing = false;
  }

}
