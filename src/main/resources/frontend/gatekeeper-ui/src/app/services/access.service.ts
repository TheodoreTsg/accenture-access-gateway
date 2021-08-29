import {Injectable} from "@angular/core";
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Authenticated} from '../shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  access(loginParam: string): Observable<Authenticated> {
    return this.httpClient.get<Authenticated>(
      environment.serverURL + environment.authURL + environment.api.access,
      { headers: new HttpHeaders({'Authorization': 'Basic ' + loginParam})}
    )
      .pipe(
        catchError( reason => {
          return throwError(reason);
        })
      );
  }
}
