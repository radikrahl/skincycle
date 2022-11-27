import { NgModule } from '@angular/core';
import { ContentLayoutComponent } from './content-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ContentLayoutComponent, HeaderComponent, FooterComponent],
  imports: [SharedModule],
  providers: [],
  exports: [],
})
export class ContentLayoutModule {}
