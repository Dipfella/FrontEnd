import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API_URL= environment.API_URL + 'Auth/';
  constructor(private http : HttpClient) { }

  SignUp(userObj:any){
    return this.http.post<any>(`${this.API_URL}register`, userObj)
  }

  Login(loginObj:any){
    return this.http.post<any>(`${this.API_URL}authentication`, loginObj)
  }
}
