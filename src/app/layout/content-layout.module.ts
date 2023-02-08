import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './content-layout.component';
import { CommonModule } from '@angular/common';
import { FixedBackgroundComponent } from '../shared/components/fixed-background/fixed-background.component';
import { NgxsModule } from '@ngxs/store';
import { HeaderState } from './header/state/header.state';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    FixedBackgroundComponent,
    MenuComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([HeaderState]),
  ],
  providers: [],
  exports: [FixedBackgroundComponent, HeaderComponent],
})
export class ContentLayoutModule {}
