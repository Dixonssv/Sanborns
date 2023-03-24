import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CurriculumComponent {

  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x1 dash-card-y4';

}
