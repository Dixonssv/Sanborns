import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GridStack } from 'gridstack';
import { GridstackComponent, gsCreateNgComponents, NgGridStackWidget, nodesCB, BaseWidget, NgGridStackOptions } from 'gridstack/dist/angular';
import { CardComponent } from '../cards/card/card.component';

@Component({
  selector: 'app-gridstack-test',
  templateUrl: './gridstack-test.component.html',
  styleUrls: ['./gridstack-test.component.css']
})
export class GridstackTestComponent implements AfterViewInit{

  grid!: GridStack;

  constructor() {
    this.grid = GridStack.init();

    GridstackComponent.addComponentToSelectorType([CardComponent]);
  }

  ngAfterViewInit(): void {
    console.log(this.gridOptions);
  }

  public gridOptions: NgGridStackOptions = {
    margin: 5,
    minRow: 1, // make space for empty message
    children: [ // or call load()/addWidget() with same data
      {x:0, y:0, minW:2, selector:'app-card', input: {title: "hola"}},
      {x:1, y:0, selector:'app-card'},
      {x:0, y:1, content:'plain html content'},
    ]
  }

  public addWidget() {
    //this.grid.makeWidget()

  }
  


}


