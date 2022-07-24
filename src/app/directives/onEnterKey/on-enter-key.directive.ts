import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnEnterKey]'
})
export class OnEnterKeyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup.enter') onOffFocus() {
    this.el.nativeElement.blur();
  }
}
