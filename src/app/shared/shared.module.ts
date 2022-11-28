import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InputBaseDirective } from './components/base/input-base.directive';
import { FixedBackgroundComponent } from './components/fixed-background/fixed-background.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

  ],
  declarations: [
    InputBaseDirective,
    FixedBackgroundComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FixedBackgroundComponent
  ],
})
export class SharedModule {}
