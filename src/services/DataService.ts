import {throwError as observableThrowError,  Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {catchError, switchMap} from 'rxjs/operators';
import { Service } from 'shared/interfaces';
import { DataResponse } from 'shared/types';
import { DATA } from './mock-data';

export class DataService implements Service {
  getData(): Promise<any> {
    return Promise.resolve(DATA);
  }

  getRemoteData(url: string): Observable<DataResponse> {
    return fromFetch(url).pipe(
      switchMap<Response, Function>((r: Response): any => this.extractData(r)),
      catchError(this.handleError),
    );
  }

  private extractData(res: Response) {
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
