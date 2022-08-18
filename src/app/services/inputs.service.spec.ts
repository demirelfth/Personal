import { TestBed } from '@angular/core/testing';

import { InputsService } from './inputs.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('InputsService', () => {
  let service: InputsService;
  let http:HttpClient;
  let httpController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ InputsService ]
    });
    service = TestBed.inject(InputsService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeDefined();
    expect(service).toBeTruthy();
  });
});
