import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutModule } from './layout/content-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, ContentLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
