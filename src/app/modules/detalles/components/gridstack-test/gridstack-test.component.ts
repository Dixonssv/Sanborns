import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GridStack } from 'gridstack';
import { GridstackComponent, gsCreateNgComponents, NgGridStackWidget, nodesCB, BaseWidget, NgGridStackOptions } from 'gridstack/dist/angular';
import { CardComponent } from '../cards/card/card.component';
import { CardMapper } from '../../models/mappers/card.mapper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CardModel } from '../../models/card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gridstack-test',
  templateUrl: './gridstack-test.component.html',
  styleUrls: ['./gridstack-test.component.css']
})
export class GridstackTestComponent implements OnInit, OnDestroy, AfterViewInit{

  grid!: GridStack;

  gridOptions: NgGridStackOptions = {
    margin: 5,
    minRow: 1,
  }

  items: NgGridStackWidget[] = [];

  cardMapper: CardMapper = new CardMapper();

  // Suscripciones
  private subscriptions:Subscription[];

  constructor(private vcRef: ViewContainerRef, public dashboardService: DashboardService) {

    this.subscriptions = [];

    GridstackComponent.addComponentToSelectorType([CardComponent]);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // Cards Changed
      this.dashboardService.cardsChanged.pipe().subscribe(() => {
        this.grid.removeAll();

        this.dashboardService.getCards().subscribe((card) => {
          this.loadCard(card);
        });
      }
      ),
    )
  }

  ngOnDestroy(): void {
    this.dashboardService.destroy().subscribe();

    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  ngAfterViewInit(): void {
    this.grid = GridStack.init();
    //console.log(this.gridOptions);
  }

  loadCard(card: CardModel) {
    let w: NgGridStackWidget = {
      x: 0,
      y: 0,
      autoPosition: true,
      minW: card.x,
      minH: card.y,
      selector: 'app-card',
      input: {card: card}
    }

    this.grid.addWidget(w);
  }

  public identify(index: number, w: NgGridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
  }

}


