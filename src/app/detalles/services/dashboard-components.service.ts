import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { AdComponent } from './ad-component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CurriculumComponent } from '../components/curriculum/curriculum.component';
import { EstudiosComponent } from '../components/estudios/estudios.component';
import { ContratoComponent } from '../components/contrato/contrato.component';
import { HorarioComponent } from '../components/horario/horario.component';
import { DocumentosComponent } from '../components/documentos/documentos.component';
import { NominaComponent } from '../components/nomina/nomina.component';
import { ActasComponent } from '../components/actas/actas.component';
import { TrayectoriaComponent } from '../components/trayectoria/trayectoria.component';
import { CursosComponent } from '../components/cursos/cursos.component';
import { DatosPersonalesComponent } from '../components/datos-personales/datos-personales.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardComponentsService {
  
  private adds:any;

  addsChanged = new Subject<string>();

  constructor() {
    this.adds = [];
  }

  addComponent(component: string) {
    let adComponent:AdComponent;

    switch(component) {
      case "Datos personales": {
        adComponent = new AdComponent(DatosPersonalesComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Curriculum": {
        adComponent = new AdComponent(CurriculumComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Estudios": {
        adComponent = new AdComponent(EstudiosComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Contrato": {
        adComponent = new AdComponent(ContratoComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Horario": {
        adComponent = new AdComponent(HorarioComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Documentos": {
        adComponent = new AdComponent(DocumentosComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Nomina": {
        adComponent = new AdComponent(NominaComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Actas": {
        adComponent = new AdComponent(ActasComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Trayectoria": {
        adComponent = new AdComponent(TrayectoriaComponent);
        this.adds.push(adComponent);
        break;
      }
      case "Cursos": {
        adComponent = new AdComponent(CursosComponent);
        this.adds.push(adComponent);
        break;
      }
      
    }

    // Llamada al observer
    this.addsChanged.next(component);
  }

  getComponents() {
    return this.adds;
  }

/*
    getAds() {
      return [
        new AdItem(
          HeroProfileComponent,
          { name: 'Bombasto', bio: 'Brave as they come' }
        ),
        new AdItem(
          HeroProfileComponent,
          { name: 'Dr. IQ', bio: 'Smart as they come' }
        ),
        new AdItem(
          HeroJobAdComponent,
          { headline: 'Hiring for several positions', body: 'Submit your resume today!' }
        ),
        new AdItem(
          HeroJobAdComponent,
          { headline: 'Openings in all departments', body: 'Apply today' }
        )
      ];
    }
    */
}
