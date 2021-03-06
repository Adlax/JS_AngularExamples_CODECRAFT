import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[hoverfocus]',
})
export class HoverFocusDirective {
  @HostBinding("style.background-color") backgroundColor: string;
  @HostListener('mouseover') onHover() {
    this.backgroundColor = 'blue';
  }
  @HostListener('mouseout', null) onLeave() {
    this.backgroundColor = 'inherit';
  }
}
