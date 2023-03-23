import { Directive, ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class AddDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
