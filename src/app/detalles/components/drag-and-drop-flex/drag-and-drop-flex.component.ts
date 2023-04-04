import { Component, NgModule, ViewChild } from '@angular/core';
import {
  CdkDragDrop
} from "@angular/cdk/drag-drop";
import {ViewportRuler} from "@angular/cdk/overlay";


@Component({
  selector: 'app-drag-and-drop-flex',
  templateUrl: './drag-and-drop-flex.component.html',
  styleUrls: ['./drag-and-drop-flex.component.css']
})
export class DragAndDropFlexComponent {
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  
  drop(event: CdkDragDrop<any>) {
    this.items[event.previousContainer.data.index] = event.container.data.item;
    this.items[event.container.data.index] = event.previousContainer.data.item;
  }
}