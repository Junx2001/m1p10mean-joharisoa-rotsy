import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor (){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem("token")){
            const headers = new HttpHeaders()
            .append('Authorization',`Bearer ${localStorage.getItem("token")}`);
            const modifiedReq = req.clone({ headers : headers})
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }
}