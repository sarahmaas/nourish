
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Measure } from '../models/Measure';


@Injectable()
export class MeasureService {


  constructor(private http: HttpClient,
              private authService: AuthService ) {
  }

  /*
   * get all measures
   */

  getAllMeasures() {
    return this.http.get<Measure[]>('/measures')
      .pipe(retry(3), catchError(this.handleError));
  }

  /*
   * get a specific measure
   */

  getMeasureByID(measureID: number): Observable<Measure> {
    return this.http.get<Measure>(`/measures/${measureID}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  /*
   * error handling function for Shopping List service
   */

  private handleError (error: HttpErrorResponse | any) {
    console.error('ShoppingListService::handleError', error);
    return throwError(error);
  }

}
