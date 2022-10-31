import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class TenantInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Tenant': 'Almamoon',
            }
        });
        // Handle the request and move into next interceptors if available
        return handler.handle(request);
    }
}
