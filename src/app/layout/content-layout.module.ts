import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './content-layout.component';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { HeaderState } from './header/state/header.state';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([HeaderState]),
  ],
  providers: [],
  exports: [HeaderComponent],
})
export class ContentLayoutModule {}
