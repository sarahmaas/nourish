// https://www.ng-conf.org/angulars-httpclient-testing-depth/

import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DietaryRestrictionService } from './dietary-restriction.service';

import { DietaryRestriction } from '../models/DietaryRestriction';

describe('DietaryRestrictionService', () => {
  let provider: DietaryRestrictionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietaryRestrictionService],
      imports: [HttpClientTestingModule]
    });
    provider = TestBed.get(DietaryRestrictionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([HttpClientTestingModule, DietaryRestrictionService],
     (http: HttpTestingController, service: DietaryRestrictionService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllDietaryRestrictions', () => {
    it('should return an Observable<DietaryRestriction[]>', () => {
      const dummyRestrictions: DietaryRestriction[] = [
        {'id': 2, 'name': 'vegan'},
        {'id': 12, 'name': 'vegetarian'}
      ];

      provider.getAllDietaryRestrictions().subscribe(restrictions => {
        expect(restrictions.length).toBe(2);
        expect(restrictions).toEqual(dummyRestrictions);
      });
    });
  });
});
