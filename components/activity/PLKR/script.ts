import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule, AfterContentInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'carousel-item',
  template:`
    <div class="">
      <ng-content></ng-content>
    </div>
  `
})
class CarouselItemComponent {

}

@Component({
  selector: 'carousel',
  template:`
    <div class="">
      <div class="">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
class CarouselComponent {
  ngAfterContentInit() {}
}

@Component({
  selector: 'app'
  template:`
    <carousel [delay]=2000>
      <carousel-item>
        <img src="">
      </carousel-item>
      <carousel-item>
        <img src="">
      </carousel-item>
      <carousel-item>
        <img src="">
      </carousel-item>
    </carousel>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations:[
    AppComponent,
    CarouselItemComponent,
    CarouselComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
