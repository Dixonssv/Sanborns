import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrintable]'
})
export class PrintableDirective implements AfterViewInit{

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    /*
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "margin",
      "auto"
    );
    */

    this.setWith();
    //this.setHeight();
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

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "z-index",
      0
    )
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
