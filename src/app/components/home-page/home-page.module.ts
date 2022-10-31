import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MessageComponent } from '../app-loading/message/message.component';
import { IconsModule } from '../shared/icons/icons.module';
import { BannerComponent } from './banner/banner.component';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page.routing.module';
import { ContactUsComponent } from './contact-us/contact-us/contact-us.component';
@NgModule({
  declarations: [
     BannerComponent,
     HomePageComponent,
     MessageComponent,
     ContactUsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    IconsModule,
    NgbModule,
    CarouselModule,
    HomePageRoutingModule
  ],
  exports: [
    BannerComponent,
    HomePageComponent,
    MessageComponent,
    ContactUsComponent
    
  ]
})
export class HomePageModule { 

}
