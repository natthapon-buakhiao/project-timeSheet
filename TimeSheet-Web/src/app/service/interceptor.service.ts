import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('accessToken')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
    }
    return next.handle(request).pipe(tap((res) => {
      console.log(res);

    }, err => {
      if (err.status === 401) {
        console.log(err);
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      }
    }
    ));
  }
}
