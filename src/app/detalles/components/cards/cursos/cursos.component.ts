import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CursosComponent {
  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x3 dash-card-y2';

}
