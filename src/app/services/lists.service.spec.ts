import { TestBed } from '@angular/core/testing';

import { ListsService } from './lists.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ListsService', () => {
  let service: ListsService;
  let http:HttpClient;
  let httpController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ListsService ]
    });
    service = TestBed.inject(ListsService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeDefined();
    expect(service).toBeTruthy();
  });
});
