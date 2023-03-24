import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,

})
export class DocumentosComponent {

  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x3 dash-card-y3';

}
