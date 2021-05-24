import { EventEmitter, OnDestroy } from "@angular/core";
import { Directive, Output } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnDestroy {
  private destroy$ = new Subject<void>();
  @Output() onScrollDown = new EventEmitter<void>();

  constructor(private select: MatSelect) {
    this.select.openedChange.subscribe( value => this.registerPanelScrollEvent(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private registerPanelScrollEvent(open: boolean) {
    if (!open) return;

    fromEvent<Event>(this.select.panel.nativeElement, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => this.onScroll(event))
  }

  private onScroll(event: Event) {
    const element = event.target as Element;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.onScrollDown.emit()
    }
  }
}
