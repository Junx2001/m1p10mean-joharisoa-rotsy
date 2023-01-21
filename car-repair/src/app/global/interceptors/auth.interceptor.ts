import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor (){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Credentials','true')
        .set('Access-Control-Allow-Origin','*');
        if (localStorage.getItem("token")){
            headers = headers.append('auth-token',localStorage.getItem("token"));
        }
        const modifiedReq = req.clone({ headers : headers})
        return next.handle(modifiedReq);
    }
}