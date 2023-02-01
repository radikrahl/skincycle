import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutModule } from './layout/content-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentLayoutModule,
    NgxsModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
