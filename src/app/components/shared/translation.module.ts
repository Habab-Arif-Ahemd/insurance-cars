import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(httpClient: HttpClient) {
   return new TranslateHttpLoader(httpClient);
}


@NgModule({
   imports: [
      CommonModule,
      TranslateModule.forChild({})
   ],
   exports: [
      TranslateModule
   ]
})


export class TranslationModule { }
