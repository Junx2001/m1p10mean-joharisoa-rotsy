import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError} from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor{
    constructor (private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
      .pipe(
            catchError((error: HttpErrorResponse) => {
               let errorMsg = '';
               if (error.error instanceof ErrorEvent) {
                  // console.log('This is client side error');
               } else {
                  console.log('This is server side error');
                  console.log(error)
                  errorMsg = `Error Code: ${error.status},  Message: ${error.error.error}`;
                  if (error.status==400 && error.error.error === 'auth failed, check auth-token222'){
                     this.router.navigateByUrl('/login');
                  }
               }
               // console.log(errorMsg);
               return throwError(errorMsg);
            })
      )
   }
}