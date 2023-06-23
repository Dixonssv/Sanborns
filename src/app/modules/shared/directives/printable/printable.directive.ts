import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrintable]'
})
export class PrintableDirective implements AfterViewInit{

  @Output()
  onPrint: EventEmitter<any> = new EventEmitter();

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

  printing(state: boolean) {
    if(state === true) {
      this.onPrint.emit(null);
    }
  }

  @HostListener('window:resize', ['$event'])
  setWith() {
    
    this.renderer.removeStyle(this.hostElement.nativeElement, "width");
    this.renderer.removeStyle(this.hostElement.nativeElement, "min-width");

    const styles = getComputedStyle(this.hostElement.nativeElement);

    let currentWidth = +styles.width.replace("px", "");

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "width",
      currentWidth + "px"
    );

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "min-width",
      currentWidth + "px"
    );
  }

  getWidth() {
    const styles = getComputedStyle(this.hostElement.nativeElement);

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
