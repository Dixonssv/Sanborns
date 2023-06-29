import { Component, HostBinding, Type, ViewChild, ViewEncapsulation, ViewContainerRef, HostListener, ElementRef, OnInit, Renderer2, AfterViewInit, Input} from '@angular/core';

import { CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList } from "@angular/cdk/drag-drop";

import { CardModel } from '../../../models/card.model';
import { CardContentDirective } from 'src/app/modules/shared/directives/card-content/card-content.directive';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { DragAndDropService } from '../../../services/drag-and-drop/drag-and-drop.service';
import { BaseWidget } from 'gridstack/dist/angular';
import { DatosPersonalesComponent } from '../datos-personales/datos-personales.component';
import { CurriculumComponent } from '../curriculum/curriculum.component';
import { EstudiosComponent } from '../estudios/estudios.component';
import { ContratoComponent } from '../contrato/contrato.component';
import { HorarioComponent } from '../horario/horario.component';
import { DocumentosComponent } from '../documentos/documentos.component';
import { NominaComponent } from '../nomina/nomina.component';
import { ActasComponent } from '../actas/actas.component';
import { TrayectoriaComponent } from '../trayectoria/trayectoria.component';
import { CursosComponent } from '../cursos/cursos.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../cards.css'],
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [ ],
})
export class CardComponent extends BaseWidget implements OnInit, AfterViewInit{

  @HostBinding('class') classAttribute: string;

  @ViewChild(CardContentDirective, {static: true}) CardContent!: CardContentDirective;

  @ViewChild(CdkDropList, {static: true}) dropList!: CdkDropList;

  @Input() card!: CardModel;

  private readonly cardTypes: {[selector: string]:Type<any>} = {
    "app-datos-personales": DatosPersonalesComponent,
    "app-curriculum":       CurriculumComponent,
    "app-estudios":         EstudiosComponent,
    "app-contrato":         ContratoComponent,
    "app-horario":          HorarioComponent,
    "app-documentos":       DocumentosComponent,
    "app-nomina":           NominaComponent,
    "app-actas":            ActasComponent,
    "app-trayectoria":      TrayectoriaComponent,
    "app-cursos":           CursosComponent,
  }

  constructor(
    private renderer: Renderer2,
    public hostElement: ElementRef,
    public dashboardService: DashboardService,
    public dragAndDropService: DragAndDropService) {
      super();
      this.classAttribute = "";
  }

  ngOnInit(): void {
    this.setContent(this.cardTypes[this.card.selector]);
  }

  ngAfterViewInit(): void {

  }

  cardDragStart(event: CdkDragStart<any>) {
    this.dragAndDropService.dragStarted(event).subscribe();
  }

  cardDragMoved(event: CdkDragMove<any>) {
    this.dragAndDropService.dragMoved(event).subscribe();
  }

  cardDropped(event: CdkDragEnd) {
    this.dragAndDropService.onDropped(event).subscribe(() => {
      this.dashboardService.cardsChanged.next(true);
    });
  }

  setContent(component:Type<any>) {
    const viewContainerRef:ViewContainerRef = this.CardContent.viewContainerRef;

    viewContainerRef.createComponent(component);
  }

  removeFromDashboard() {
    this.dashboardService.deleteCard(this.card);
  }

  addClass(styleClass: string) {
    this.classAttribute += styleClass;
  }

  removeClass(styleClass: string) {
    var re = new RegExp(styleClass);
    this.classAttribute = this.classAttribute.replace(re, "");
  }
}
