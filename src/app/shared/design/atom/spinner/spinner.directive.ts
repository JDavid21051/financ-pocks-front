import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive, ElementRef,
  HostBinding,
  Input, Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {SpinnerComponent} from '@shared/design/atom/spinner/spinner.component';

@Directive({
  selector: '[pockSpinner]',
  standalone: true
})
export class SpinnerDirective {
  private shouldShow = false;
  private spinner: ComponentRef<SpinnerComponent>;
  private componentFactory: ComponentFactory<SpinnerComponent>;
  @HostBinding('class.spinner_overlay') isSpinnerExist = false;
  @Input('spinner')
  set nbSpinner(val: boolean) {
    if (this.componentFactory) {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  constructor(private directiveView: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private renderer: Renderer2,
              private directiveElement: ElementRef) {
  }

  ngOnInit() {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
    if (this.shouldShow) {
      this.show();
    }
  }

  hide() {
    if (this.isSpinnerExist) {
      this.directiveView.remove();
      this.isSpinnerExist = false;
    }
  }

  show() {
    if (!this.isSpinnerExist) {
      this.spinner = this.directiveView.createComponent<SpinnerComponent>(this.componentFactory);
      this.spinner.changeDetectorRef.detectChanges();
      this.renderer.appendChild(this.directiveElement.nativeElement, this.spinner.location.nativeElement);
      this.isSpinnerExist = true;
    }
  }


}
