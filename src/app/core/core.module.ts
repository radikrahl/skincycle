import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiInterceptor } from './http-interceptors/api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [{provide: 'DATA_BASE_URL', useValue: ''},{provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}]
})
export class CoreModule { }
