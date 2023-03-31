import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { DragService } from 'src/app/detalles/services/drag.service';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective implements OnInit, OnDestroy {

  private onDragStart: any;
  private onDragEnd: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private dragService: DragService) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }

  ngOnInit() {
    this.addDragEvents();
  }

  // 5
  ngOnDestroy() {
    // Remove events
    this.onDragStart();
    this.onDragEnd();
  }

  /**
   * @desc responsible for adding the drag events to the directive
   * @note transfers drag data using the Drag and Drop API (Browser)
   * @note known CSS issue where a draggable element cursor cant be set while dragging in Chrome
   */
  // 6
  private addDragEvents(): void {
    // 7
    this.onDragStart = this.renderer.listen(
      this.elementRef.nativeElement, 
      'dragstart', 
      (event: DragEvent): void => {
        // Transfer the data using Drag and Drop API (Browser)
        event.dataTransfer?.setData('Text', (event.target as HTMLDivElement).outerHTML);
      });

    // 8
    this.onDragEnd = this.renderer.listen(
      this.elementRef.nativeElement, 
      'dragend', 
      (event: DragEvent): void => {
        this.dragService.removeHighLightedAvailableZones();
      });
  }
}

