import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resource = '';

  constructor() { }

  ngOnInit(): void {
  }

  showResource(resource: any): void {
    this.resource = resource;
  }

}
