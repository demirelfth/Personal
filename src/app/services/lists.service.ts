import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  hostname = 'http://localhost:3200/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-CustomHttpHeader':'deneme'
    })
  };

  constructor(private http:HttpClient) { }

  deletePersonalData(json:Object){
    const header = {'Content-Type':  'application/json'};
    this.hostname = 'http://localhost:3200/deletePersonalData';
    return this.http.post(this.hostname, json, this.httpOptions);
  }
}
