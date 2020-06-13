import {throwError as observableThrowError,  Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {catchError, switchMap} from 'rxjs/operators';
import { DATA } from './mock-data';

export class DataService {
  getData(): Promise<any> {
    return Promise.resolve(DATA);
  }

  getRemoteData(url): Observable<any> {
    return fromFetch(url).pipe(
      switchMap(this.extractData),
      catchError(this.handleError),
    );
  }

  private extractData(res) {
    const body = res.json();

    return (body || { });
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observableThrowError(errMsg);
  }

}
