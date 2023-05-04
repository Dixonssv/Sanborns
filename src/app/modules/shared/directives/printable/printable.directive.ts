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
    this.setWith();
    //this.setHeight();
  }

  @HostListener('window:resize', ['$event'])
  setWith() {
    console.log("Windows resize!!");
    
    this.renderer.removeStyle(
      this.hostElement.nativeElement,
      "width"
    );

    const styles = getComputedStyle(this.hostElement.nativeElement);

    let currentWidth = +styles.width.replace("px", "");

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "width",
      currentWidth + "px"
    );
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

  @HostListener("click")
  public clicked() {
    console.log("Clicked!");
  }

}
