import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';


@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

   constructor() { }

   intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

      // Get the current selected application language
      let appLanguage = localStorage.getItem(LocallyStoredItemsKeys.AppLanguage);

      if (appLanguage) {
         appLanguage = appLanguage === 'ar' ? 'ar-SA' : 'en-US';
         request = request.clone({
            setHeaders: {
               'Content-Language': appLanguage,
               'Accept-Language': appLanguage
            }
         });
      }

      // Handle the request and move into next interceptors if available
      return handler.handle(request);

   }
}
