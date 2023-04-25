import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[CardContent]'
})
export class CardContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
