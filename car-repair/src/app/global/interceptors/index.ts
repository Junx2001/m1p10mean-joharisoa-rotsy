import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { ErrorCatchingInterceptor } from "./error-catching.interceptor";
import { LoadingInterceptor } from "./loading.interceptor";

export const httpInterceptorProviders = [
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : LoadingInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : ErrorCatchingInterceptor, multi : true},
];