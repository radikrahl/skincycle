import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRoutingModule, SharedModule],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
