import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HorarioComponent {

  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x1 dash-card-y1';

}
