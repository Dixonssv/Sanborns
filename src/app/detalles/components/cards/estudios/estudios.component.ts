import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EstudiosComponent {

  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x2 dash-card-y4';

}
