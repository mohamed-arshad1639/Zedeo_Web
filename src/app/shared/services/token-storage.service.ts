import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'name';
const CUSTID_KEY='CUST_ID';
const Email_KEY='email';
const Phone_KEY='Phone'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  public saveEmail(email: any): void {
    window.sessionStorage.removeItem(Email_KEY);
    window.sessionStorage.setItem(Email_KEY, JSON.stringify(email));
  }

  public getEmail(): any {
    const email = window.sessionStorage.getItem(Email_KEY);
    if (email) {
      return JSON.parse(email);
    }

    return {};
  }
  public saveCustId(custId: any): void {
    window.sessionStorage.removeItem(CUSTID_KEY);
    window.sessionStorage.setItem(CUSTID_KEY, JSON.stringify(custId));
  }

  public getCustId(): any {
    const custID = window.sessionStorage.getItem(CUSTID_KEY);
    if (custID) {
      return JSON.parse(custID);
    }

    return {};
  }
  public savePhoneNumber(phone: any): void {
    window.sessionStorage.removeItem(Phone_KEY);
    window.sessionStorage.setItem(Phone_KEY, JSON.stringify(phone));
  }

  public getPhoneNumber(): any {
    const Phone= window.sessionStorage.getItem(Phone_KEY);
    if (Phone) {
      return JSON.parse(Phone);
    }

    return {};
  }


}