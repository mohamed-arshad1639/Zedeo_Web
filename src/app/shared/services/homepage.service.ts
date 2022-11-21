import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const AUTH_API = 'http://18.208.225.35/api/user/';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {


  constructor(private http:HttpClient) { }

 getHomeSlider(){ 
  return this.http.get(AUTH_API + 'main/view-all-banner', {
 });

 }

}
