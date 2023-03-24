import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-trayectoria',
  templateUrl: './trayectoria.component.html',
  styleUrls: ['./trayectoria.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TrayectoriaComponent {
  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x4 dash-card-y1';

}
