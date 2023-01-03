import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion.component";
import { AccordionContentDirective } from "./directives/accordion-content.directive";
import { AccordionHeaderDirective } from "./directives/accordion-header.directive";
import { AccordionItemDirective } from "./directives/accordion-item.directive";

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionHeaderDirective
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionHeaderDirective,
  ]
})
export class AccordionModule {}
