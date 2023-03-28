/*
  Referencia: https://stackblitz.com/run?file=src%2Fapp%2Fad-banner.component.ts,src%2Fapp%2Fad.component.ts,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fhero-job-ad.component.ts,src%2Fapp%2Fad-item.ts
*/

import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { AdComponent } from './ad-component';

import { Card } from '../components/cards/card/card';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CurriculumComponent } from '../components/cards/curriculum/curriculum.component';
import { EstudiosComponent } from '../components/cards/estudios/estudios.component';
import { ContratoComponent } from '../components/cards/contrato/contrato.component';
import { HorarioComponent } from '../components/cards/horario/horario.component';
import { DocumentosComponent } from '../components/cards/documentos/documentos.component';
import { NominaComponent } from '../components/cards/nomina/nomina.component';
import { ActasComponent } from '../components/cards/actas/actas.component';
import { TrayectoriaComponent } from '../components/cards/trayectoria/trayectoria.component';
import { CursosComponent } from '../components/cards/cursos/cursos.component';
import { DatosPersonalesComponent } from '../components/cards/datos-personales/datos-personales.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardComponentsService {
  
  private cards:Card[];

  cardsChanged = new Subject<boolean>();

  constructor() {
    this.cards = [];
  }

  addCard(type: string) {
    let card:any;

    switch(type) {
      case "Datos personales": {
        card = new Card(DatosPersonalesComponent, 2, 2);
        break;
      }
      case "Curriculum": {
        card = new Card(CurriculumComponent, 1, 3);
        break;
      }
      case "Estudios": {
        card = new Card(EstudiosComponent, 2, 3);
        break;
      }
      case "Contrato": {
        card = new Card(ContratoComponent, 1, 2);
        break;
      }
      case "Horario": {
        card = new Card(HorarioComponent, 4, 1);
        break;
      }
      case "Documentos": {
        card = new Card(DocumentosComponent, 2, 4);
        break;
      }
      case "Nomina": {
        card = new Card(NominaComponent, 1, 1);
        break;
      }
      case "Actas": {
        card = new Card(ActasComponent, 2, 1);
        break;
      }
      case "Trayectoria": {
        card = new Card(TrayectoriaComponent, 4, 2);
        break;
      }
      case "Cursos": {
        card = new Card(CursosComponent, 3, 1);
        break;
      }
    }

    if(this.isInDashboard(card) == -1) {
      this.cards.push(card);      
    }

    // Llamada al observer
    this.cardsChanged.next(true);
  }

  getCards() {
    return this.cards;
  }

  isInDashboard(newCard: Card) {
    // Regresa el indice si se encuentra en el arreglo. Si no, -1.

    let i = 0;
    let index = -1;

    this.cards.forEach(card => {
      if(card.component == newCard.component) {
        index = i;
      }
      i++;
    });

    return index;
  }

  deleteCard(card: Card) {
    let index = this.isInDashboard(card);

    if(index >= 0) {
      // Se encuentra en el array

      this.cards.splice(index, 1);

      this.cardsChanged.next(true);
    }
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
