import {
  Directive,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[scAccordionContent]',
})
export class AccordionContentDirective implements OnInit {
  private readonly element: ElementRef;
  private isOpen = false;
  constructor(templateRef: ViewContainerRef) {
    this.element = templateRef.element;
  }
  ngOnInit(): void {
    const element = this.element.nativeElement as HTMLElement;
    element.style.height = 0 + 'px';
  }

  toggle() {
    const element = <HTMLElement>this.element.nativeElement;
    const hiddenClass = 'u-hidden';
    const productslistElement = <HTMLElement>element.querySelector('div');
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      element.classList.remove(hiddenClass);
      element.style.height = productslistElement.offsetHeight + 'px';
    } else {
      element.classList.add(hiddenClass);
      element.style.height = 0 + 'px';
    }
  }

  close() {
    const element = <HTMLElement>this.element.nativeElement;
    const hiddenClass = 'u-hidden';

    element.classList.add(hiddenClass);
      element.style.height = 0 + 'px';
  }
}
