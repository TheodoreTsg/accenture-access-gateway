import {Injectable} from "@angular/core";
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Authenticated} from '../shared/models/models';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
  }

  access(loginParam: string): Observable<Authenticated> {
    return this.httpClient.get<Authenticated>(
      environment.serverURL + environment.authURL + environment.api.access,
      { headers: new HttpHeaders({'Authorization': 'Basic ' + loginParam})}
    )
      .pipe(
        catchError( reason => {
          this.errorService.displayDynamicErrorMessage(reason);
          return throwError(reason);
        })
      );
  }
}
