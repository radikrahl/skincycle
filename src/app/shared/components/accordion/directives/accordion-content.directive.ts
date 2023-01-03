import {
  Directive,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[scAccordionContent]',
})
export class AccordionContentDirective implements OnInit {
  private readonly element: HTMLElement;
  private isOpen = false;
  constructor(templateRef: ViewContainerRef) {
    this.element = templateRef.element.nativeElement;
  }
  ngOnInit(): void {
    this.element.style.height = 0 + 'px';
  }

  @HostListener('click', ['$event']) adjust() {
    const productslistElement = <HTMLElement>this.element.querySelector('div');
    this.element.style.height = productslistElement.offsetHeight + 'px';
  }

  toggle() {
    const hiddenClass = 'u-hidden';
    const productslistElement = <HTMLElement>this.element.querySelector('div');
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.element.classList.remove(hiddenClass);
      this.element.style.height = productslistElement.offsetHeight + 'px';
    } else {
      this.element.classList.add(hiddenClass);
      this.element.style.height = 0 + 'px';
    }
  }

  close() {
    const hiddenClass = 'u-hidden';

    this.element.classList.add(hiddenClass);
    this.element.style.height = 0 + 'px';
  }
}
