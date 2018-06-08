
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import {Angular2TokenService} from 'angular2-token';
import {AuthService} from './auth.service';

import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import { Observable } from 'rxjs/Observable';

import { Measure } from '../models/Measure';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MeasureService {

  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService,
              private authService: AuthService ) {
    this.jsonConvert = new JsonConvert();
  }

  /*
   * get all measures
   */

  getAllMeasures(): Observable<Measure[]> {

    return this.authTokenService.get('/measures').map( res => {
      return this.jsonConvert.deserialize(res.json(), Measure);
    }).catch(this.handleError);

  }

  /*
   * get a specific measure
   */

  getMeasureByID(measureID: number): Observable<Measure> {
    return this.authTokenService.get('/measures/' + measureID).map( res => {
      return this.jsonConvert.deserialize(res.json(), Measure);
    });
  }

  /*
   * error handling function for Shopping List service
   */

  private handleError (error: Response | any) {
    console.error('ShoppingListService::handleError', error);
    return Observable.throw(error);
  }
  
}
