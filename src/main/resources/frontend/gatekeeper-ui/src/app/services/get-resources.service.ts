import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
  export class ResourcesService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
  }

  private resources = new ReplaySubject<any>(1);
  resources$: Observable<any> = this.resources.asObservable();

  initialize(): void {
    this.getResources().subscribe(
      resources => this.resources.next(resources.resources)
    );
  }

  private getResources(): Observable<any> {
    return this.httpClient.get(
      environment.serverURL + environment.authURL + environment.api.resources
    )
      .pipe(
        tap(),
        catchError( reason => {
          return throwError(reason);
        })
      );
  }

  getResource(resource: string, httpParams: HttpParams): Observable<any> {
    return this.httpClient.get(
      environment.serverURL + environment.authURL + resource,
      {
        params: httpParams,
        responseType: 'text'
      },
    )
      .pipe(
        tap(),
        catchError( reason => {
          this.errorService.displayDynamicTextErrorMessage(reason);
          return throwError(reason);
        })
      );
  }
}
