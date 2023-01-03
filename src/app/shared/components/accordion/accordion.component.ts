import { Component, ChangeDetectionStrategy, ContentChildren, Input, QueryList, AfterContentInit, AfterViewInit, AfterContentChecked, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AccordionItemDirective } from "./directives/accordion-item.directive";

@Component({
  selector: "sc-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentChecked, OnDestroy{
  ngOnDestroy(): void {
    this.subjects.forEach(x => x.unsubscribe())
  }
 private subjects: Subscription[] = [];

  ngAfterContentChecked(): void {
   if (this.collapsing && this.subjects.length <= 0) {
     this.items?.forEach(x => {
       this.subjects.push(x.isOpenSubject.subscribe(() => this.closeAll()));
     });
    }
  }

  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
  */
 @Input() collapsing = true;

 @ContentChildren(AccordionItemDirective) items?: QueryList<AccordionItemDirective>;


 closeAll() {
  if (this.collapsing) {
    this.items?.forEach(x => {
      x.content?.close();
      // x.header?.close();
    });
   }
 }
}
