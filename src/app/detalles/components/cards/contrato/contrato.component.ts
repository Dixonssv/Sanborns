import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContratoComponent {

  @HostBinding('class') classAttribute: string = 'dash-card dash-card-x1 dash-card-y3';
  
}
