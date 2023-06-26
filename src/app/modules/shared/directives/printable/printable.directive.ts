import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrintable]'
})
export class PrintableDirective implements AfterViewInit{

  @Output()
  public onPrintStart: EventEmitter<void> = new EventEmitter();
  @Output()
  public afterPrintStart: EventEmitter<void> = new EventEmitter();

  public get element() : HTMLElement {
    return this.hostElement.nativeElement as HTMLElement;
  }

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.setWith();
  }

  @HostListener('window:resize', ['$event'])
  setWith() {
    
    this.renderer.removeStyle(this.element, "width");
    this.renderer.removeStyle(this.element, "min-width");

    let currentWidth = this.getWidth();

    this.renderer.setStyle(
      this.element,
      "width",
      currentWidth + "px"
    );

    this.renderer.setStyle(
      this.element,
      "min-width",
      currentWidth + "px"
    );
  }

  getWidth() {
    const styles = getComputedStyle(this.element);

    return +styles.width.replace("px", "");
  }

  //@HostListener('window:resize', ['$event'])
  setHeight() {

    this.renderer.removeStyle(
      this.hostElement.nativeElement,
      "height"
    );

    const styles = getComputedStyle(this.hostElement.nativeElement);

    let currentHeight = +styles.height.replace("px", "");

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "height",
      currentHeight + "px"
    );
  }

}
