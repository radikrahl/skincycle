import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './core/http-interceptors/api';
import { ContentLayoutModule } from './layout/content-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentLayoutModule,
    NgxsModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'products'
    }),
  ],
  providers: [{provide: 'DATA_BASE_URL', useValue: ''},{provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
