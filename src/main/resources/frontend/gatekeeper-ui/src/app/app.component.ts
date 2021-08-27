import { Component, OnInit } from '@angular/core';
import {ResourcesService} from "./services/get-resources.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'gatekeeper-ui';

  constructor(
    private resourcesService: ResourcesService
  ){
  }

  ngOnInit() {
    this.resourcesService.initialize();
  }
}
