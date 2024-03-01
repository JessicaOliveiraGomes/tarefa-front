import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router, public dialog: MatDialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq;

    if (localStorage.getItem('basicAuth')) {
      let auth: any = localStorage.getItem('basicAuth')
        ? localStorage.getItem('basicAuth')
        : '';
      authReq = req.clone({
        setHeaders: {
          Authorization: `${auth}`,
        },
      });

      return next.handle(authReq).pipe(
        
        catchError((error) => {
          // Intercepta respostas "401 Unauthorized"
          if (
            error instanceof HttpErrorResponse &&
            (error.status === 401 || error.status === 302)
          ) {
            localStorage.clear();
            this.openDialog();
            //this._router.navigate(['/login']);
          }

          return throwError(() => error);
        })
      );
    }

    if (!localStorage.getItem('basicAuth')){
      this.openDialog();
    }

    // If there is no token, pass the original request
    return next.handle(req).pipe(
      catchError((error) => {
        // Intercepta respostas "401 Unauthorized"
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 302)
        ) {
          localStorage.clear();
          this.openDialog();
          //this._router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { data: null });
  }
}
