import {
  Directive,
  EventEmitter,
  HostListener,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[scAccordionHeader]',
})
export class AccordionHeaderDirective {
  private readonly element: HTMLElement;
  public clicked: EventEmitter<boolean>;

  private isOpen = false;
  constructor(templateRef: ViewContainerRef) {
    this.element = templateRef.element.nativeElement;
    this.clicked = new EventEmitter<boolean>();
  }

  @HostListener('click', ['$event']) toggle() {
    this.isOpen = !this.isOpen;
    this.clicked.emit(this.isOpen);
  }

  close() {
    this.isOpen = false;
  }
}
