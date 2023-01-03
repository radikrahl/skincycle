import {
  AfterContentInit,
  ContentChild,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionHeaderDirective } from './accordion-header.directive';

@Directive({
  selector: '[scAccordionItem]',
})
export class AccordionItemDirective implements OnDestroy, AfterContentInit {

  @Input() title = '';
  @Input() disabled = false;

  isOpenSubject: Subject<boolean> = new Subject<boolean>();

  @ContentChild(AccordionContentDirective) content?: AccordionContentDirective;
  @ContentChild(AccordionHeaderDirective) header?: AccordionHeaderDirective;

  ngAfterContentInit(): void {
    this.header?.clicked.subscribe((x) => {
      this.isOpenSubject.next(x);
      this.content?.toggle();
    });
  }
  ngOnDestroy(): void {
    this.header?.clicked.unsubscribe();
  }
}
