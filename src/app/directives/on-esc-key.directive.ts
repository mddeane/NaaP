import { Directive, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appOnEscKey]'
})
export class OnEscKeyDirective {

  @Input() previousValue: string = "";

  // this is the value to set when ESC is pressed to return to previous value
  escValue: string = "";

  constructor(private el: ElementRef) { }   // grab the element tag

  /* This function grabs the value of the element when it is initially in focus.
  This is saved in case the user hits escape, when it would restore the previous value
  without making any changes.
  */
  @HostListener('focus') setPreviousValue() {
    this.escValue = this.previousValue;
    console.log(this.escValue);
  }

  /* This function listens for ESC up, changes the value of the input to the previous value, 
  and executes blur.
  */
  @HostListener('keyup.esc') escOffFocus() {
    this.el.nativeElement.value = this.escValue;
    this.el.nativeElement.blur();
  }
}
