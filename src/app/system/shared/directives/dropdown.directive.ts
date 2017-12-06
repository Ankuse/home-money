import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[usrDropdown]'
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false;
  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }


}
