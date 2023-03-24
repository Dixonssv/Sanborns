import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ActasComponent {
  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x1 dash-card-y2';

}
