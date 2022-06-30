/** Angular Imports */
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

/** Local Imports */
import { City } from "../../shared/models/city";
import { CityConditions } from "../../shared/models/city-conditions";
import { CurrentConditions } from "../../shared/models/weather";
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an http request to the api for current conditions', fakeAsync(() => {
    const testCityData: City = {
      id: 3,
      name: "Halifax"
    }

    const testCurrentConditionsData: CurrentConditions = {
      id: 3,
      temp: 13.7,
      windSpeed: 27.3
    }

    // Check that the response is correct
    service.getCityConditions$(3).subscribe(
      (cityConditions: CityConditions) => {
        expect(cityConditions).toEqual({...testCityData, ...testCurrentConditionsData})
      }
    );

    // Fake the time for 1 call
    tick(100);

    // Should have made 2 requests to the api
    const testCurrentConditionsRequest = httpTestingController.expectOne('api/currentConditions/3');
    const testCityRequest = httpTestingController.expectOne('api/cities/3');

    // The requests should be GET requests
    expect(testCurrentConditionsRequest.request.method).toEqual('GET');
    expect(testCityRequest.request.method).toEqual('GET');

    // Respond with the test data
    testCurrentConditionsRequest.flush(testCurrentConditionsData);
    testCityRequest.flush(testCityData);

    // Verify there are no outstanding requests
    httpTestingController.verify();

    discardPeriodicTasks();
  }));

  it('should make an api call every second', fakeAsync(() => {
    service.getCityConditions$(3).subscribe()

    // Allow enough time for 3 calls to be made
    tick(2500);

    // Expect 3 http calls
    let requests = httpTestingController.match('api/cities/3')
    expect(requests.length).toBe(3);

    discardPeriodicTasks();
  }));
});
