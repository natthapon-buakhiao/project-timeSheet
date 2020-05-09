import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ReqUserProfile } from '../shared/model/req-user-profile';
import { Observable } from 'rxjs';import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor() { }
}
