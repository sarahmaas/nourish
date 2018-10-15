import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { DietaryRestriction } from '../models/DietaryRestriction';



@Injectable()
export class DietaryRestrictionService {

  private userID: number;
  private retries = 3;

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('DietaryRestrictionService constructed:');
    this.userID = this.authService.getUser().id;
  }

  // GET /dietary_restrictions
  public getAllDietaryRestrictions(): Observable<DietaryRestriction[]> {
    return this.http.get<DietaryRestriction[]>('/dietary_restrictions')
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // POST /dietary_restrictions
  public createDietaryRestriction(restriction: DietaryRestriction): Observable<DietaryRestriction> {
    return this.http.post<DietaryRestriction>('/dietary_restrictions', restriction)
      .pipe(retry(this.retries), catchError(this.handleError));

  }

  // GET /dietary_restrictions/:id
  public getDietaryRestrictionById(restrictionID: number): Observable<DietaryRestriction> {
    return this.http.get<DietaryRestriction>(`/dietary_restrictions/${restrictionID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // PUT /dietary_restrictions/:id
  public updateDietaryRestriction(restriction: DietaryRestriction): Observable<DietaryRestriction> {
    return this.http.put<DietaryRestriction>(`/dietary_restrictions/${restriction.id}`, restriction)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // DELETE /dietary_restrictions/:id
  public deleteDietaryRestriction(restrictionID: number): Observable<null> {
    return this.http.delete<null>(`/dietary_restrictions/${restrictionID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  private handleError (error: HttpErrorResponse | any) {
    console.error('DietaryRestrictionService::handleError', error);
    return throwError(error);
  }
}
