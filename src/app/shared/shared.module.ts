import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AccordionModule } from './components/accordion/accordion.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, AccordionModule],
  declarations: [],
  exports: [CommonModule, HttpClientModule, AccordionModule],
})
export class SharedModule {}
