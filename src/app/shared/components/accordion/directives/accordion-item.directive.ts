import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
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

  private element: HTMLElement;
  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngAfterContentInit(): void {
    this.header?.clicked.subscribe((x) => {
      this.isOpenSubject.next(x);
      this.content?.toggle();
      this.element.classList.toggle('open');
    });
  }
  ngOnDestroy(): void {
    this.header?.clicked.unsubscribe();
  }
}
