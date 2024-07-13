import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorChanger]'
})
export class ColorChangerDirective {

  constructor(private el:ElementRef,private rendrer:Renderer2) { }
  private changeColor(color:string) {
    this.rendrer.setStyle(this.el.nativeElement,"backgroundColor",color)
  }
  @HostListener('mouseenter') onMouseEnter(){
    this.changeColor("red")
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.changeColor('black')
  }

}
