import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeAr from '@angular/common/locales/ar';
import localeEn from '@angular/common/locales/en';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/* Carousel */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* Translate */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileUploadModule } from 'ng2-file-upload';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Observable, of } from 'rxjs';
import { DriversService } from 'src/app/services/insurance-steps/drivers.service';
import * as arContent from '../assets/i18n/ar.json';
import * as enContent from '../assets/i18n/ar.json';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileModule } from './components/profile/profile.module';
import { SharedModule } from './components/shared/shared.module';
// import { ErrorInterceptor } from './helpers/interceptors/ErrorInterceptor';
import { JwtInterceptor } from './helpers/interceptors/JwtInterceptor';
import { LanguageInterceptor } from './helpers/interceptors/LanguageInterceptor';
import { TenantInterceptor } from './helpers/interceptors/TenantInterceptor';
import { MotorModule } from './motor-insurance.module';
import { AuthService } from './services/auth/auth.service';

//
/* -------------------------------------------------------------------------- */
/*                                   Locales                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Translation                                */
/* -------------------------------------------------------------------------- */

registerLocaleData(localeAr, 'ar');
registerLocaleData(localeEn, 'en');

const TRANSLATIONS = { ar: arContent, en: enContent };

export function HttpLoaderFactory(httpClient: HttpClient) {
   return new TranslateHttpLoader(httpClient);
}

export class TranslateUniversalLoader implements TranslateLoader {
   getTranslation(lang: string): Observable<any> {
     return of(TRANSLATIONS[lang].default);
   }
}

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ProfileModule,
    MotorModule,
    FileUploadModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
        loader: {
           provide: TranslateLoader,
           // useClass: TranslateUniversalLoader, // Used in production to enable translation
           useFactory: HttpLoaderFactory,
           deps: [HttpClient]
        }
     }),
  ],
  providers: [
   // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        AuthService.injector = injector;
        DriversService.injector = injector;
    }
}
