import { Mapper } from "src/app/modules/shared/base/mapper";
import { CardModel } from "../card.model";
import { DatosPersonalesComponent } from "../../components/cards/datos-personales/datos-personales.component";
import { CurriculumComponent } from "../../components/cards/curriculum/curriculum.component";
import { EstudiosComponent } from "../../components/cards/estudios/estudios.component";
import { ContratoComponent } from "../../components/cards/contrato/contrato.component";
import { HorarioComponent } from "../../components/cards/horario/horario.component";
import { DocumentosComponent } from "../../components/cards/documentos/documentos.component";
import { NominaComponent } from "../../components/cards/nomina/nomina.component";
import { ActasComponent } from "../../components/cards/actas/actas.component";
import { TrayectoriaComponent } from "../../components/cards/trayectoria/trayectoria.component";
import { CursosComponent } from "../../components/cards/cursos/cursos.component";
import { TestComponent } from "../../components/cards/test/test.component";
import { NgGridStackWidget } from "gridstack/dist/angular";

export abstract class CardMapper<I> extends Mapper<I, CardModel> { }

export class StringCardMapper extends CardMapper<string> {
    override mapFrom(card: string): CardModel {
        //console.log("Map from: " + param);

        switch(card) {
            case "Datos personales": {
                return {
                    title: card.toUpperCase(),
                    component: DatosPersonalesComponent,
                    w: 4,
                    h: 1
                }
            }
            case "Curriculum": {
                return {
                    title: card.toUpperCase(),
                    component: CurriculumComponent,
                    w: 2,
                    h: 3
                }
            }
            case "Estudios": {
                return {
                    title: card.toUpperCase(),
                    component: EstudiosComponent,
                    w: 4,
                    h: 3
                }
            }
            case "Contrato": {
                return {
                    title: card.toUpperCase(),
                    component: ContratoComponent,
                    w: 2,
                    h: 2
                }
            }
            case "Horario": {
                return {
                    title: card.toUpperCase(),
                    component: HorarioComponent,
                    w: 8,
                    h: 1
                }
            }
            case "Documentos": {
                return {
                    title: card.toUpperCase(),
                    component: DocumentosComponent,
                    w: 4,
                    h: 4
                }
            }
            case "Nomina": {
                return {
                    title: card.toUpperCase(),
                    component: NominaComponent,
                    w: 2,
                    h: 1
                }
            }
            case "Actas": {
                return {
                    title: card.toUpperCase(),
                    component: ActasComponent,
                    w: 4,
                    h: 1
                }
            }
            case "Trayectoria": {
                return {
                    title: card.toUpperCase(),
                    component: TrayectoriaComponent,
                    w: 2,
                    h: 2
                }
            }
            case "Cursos": {
                return {
                    title: card.toUpperCase(),
                    component: CursosComponent,
                    w: 6,
                    h: 1
                }
            }
            //Test
            default: {
                return {
                    title: card.toUpperCase(),
                    component: TestComponent,
                    w: 1,
                    h: 1
                }
            }
          }
    }

    override mapTo(card: CardModel): string {
        throw new Error("Method not implemented.");
    }
    
}

export class WidgetCardMapper extends CardMapper<NgGridStackWidget> {
    override mapFrom(card: NgGridStackWidget): CardModel {
        throw new Error("Method not implemented.");
    }
    override mapTo(card: CardModel): NgGridStackWidget {
        let widget: NgGridStackWidget = {
            id: card.title,
            x: 0,
            y: 0,
            autoPosition: true,
            minW: card.w,
            minH: card.h,
            selector: 'app-card',
            input: {card: card}
        }

        return widget;
    }
    
}