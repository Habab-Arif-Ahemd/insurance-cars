import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

   constructor() { }

   intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

      // Add Authorization header with the Jwt to all request if it is available
      const Jwt = localStorage.getItem(LocallyStoredItemsKeys.JWT);

      if (Jwt) {
         request = request.clone({
            setHeaders: {
               Authorization: 'Bearer ' + Jwt
            }
         });
      }

      // Handle the request and move into next interceptors if available
      return handler.handle(request);

   }
}
