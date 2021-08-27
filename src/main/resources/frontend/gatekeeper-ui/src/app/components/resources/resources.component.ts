import { Component, OnInit } from '@angular/core';
import {ResourcesService} from "../../services/get-resources.service";
import {ResourceFile} from "./resourceFile";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  private subs: Subscription[] = [];
  step = -1;
  lowResources: string[] = ['Boots', 'Clogs'];
  resources = [];
  lowAccess: ResourceFile[] = [];
  highAccess: ResourceFile[] = [];
  noAccess: ResourceFile[] = [];

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    private resourcesService: ResourcesService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.resourcesService.resources$.subscribe(
      resources => {this.resources = resources;
        this.resources.forEach((element, index) => {
          if (index < 2) {
            this.lowAccess.push({id: element, value: element});
          } else if (index < 4) {
            this.highAccess.push({id: element, value: element});
          } else {
            this.noAccess.push({id: element, value: element});
          }
        });
      }
    ));
  }

  ngOnDestroy() {
    this.subs.forEach((s: Subscription) => s.unsubscribe());
  }

}
