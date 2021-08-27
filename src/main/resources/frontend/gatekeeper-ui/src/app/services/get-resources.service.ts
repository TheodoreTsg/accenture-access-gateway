import {Injectable} from "@angular/core";
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
  export class ResourcesService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  private resources = new Subject();
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
}
