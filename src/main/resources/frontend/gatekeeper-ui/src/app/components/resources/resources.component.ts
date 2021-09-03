import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResourcesService} from "../../services/get-resources.service";
import {ResourceFile} from "./resourceFile";
import {Subscription} from "rxjs";
import {CookieService} from 'ngx-cookie-service';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  @Output() resourceLoading: EventEmitter<any> = new EventEmitter<string>();

  private subs: Subscription[] = [];
  resources = [];
  lowAccess: ResourceFile[] = [];
  highAccess: ResourceFile[] = [];
  noAccess: ResourceFile[] = [];

  constructor(
    private resourcesService: ResourcesService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.push(this.resourcesService.resources$.subscribe(
      resources => {this.resources = resources;
        this.resources.forEach((element, index) => {
          if (index < 2) {
            this.lowAccess.push({id: element, value: 'Level 1 Security Resource'});
          } else if (index < 4) {
            this.highAccess.push({id: element, value: 'Level 2 Security Resource'});
          } else {
            this.noAccess.push({id: element, value: 'No Security Resource'});
          }
        });
      }
    ));
  }

  ngOnDestroy() {
    this.subs.forEach((s: Subscription) => s.unsubscribe());
  }

  resourceSelected(param: string, level: string) {
    let httpParams = new HttpParams()
      .set('XSRF', this.cookieService.get('CSRF'));
    this.resourcesService.getResource(param, httpParams)
      .subscribe(value => {
        console.log(value);
        this.resourceLoading.emit(value);
      },error => {
        this.router.navigate(['/login'], {
          queryParams: {
            'Level': level
          },
          queryParamsHandling: 'merge'
        })
      });
  }

}
