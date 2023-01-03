import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[scAccordionHeader]',
})
export class AccordionHeaderDirective {
  private readonly element: ElementRef;
  public clicked: EventEmitter<boolean>;

  private isOpen = false;
  constructor(templateRef: ViewContainerRef) {
    this.element = templateRef.element;
    this.clicked = new EventEmitter<boolean>();
  }

  @HostListener('click', ['$event']) toggle() {
    this.isOpen = !this.isOpen;
    this.clicked.emit(this.isOpen);
  }
}
