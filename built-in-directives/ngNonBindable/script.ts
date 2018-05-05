import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platformBrowser';
import { platformBrowserDynamic } from '@angular/';

@Component({
  selector: 'ngNonBindable',
  template:`
    <h4> ngNonBindable example </h4>
    <div>
      To render the name variable we use this syntax <pre ngNonBindable> {{ name }} </pre>
    </div>
  `
})
class NgNonBindableExampleComponent {
}

@Component({
  selector: 'app',
  template: `
    <ngNonBindable></ngNonBindable>
  `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    NgNonBindableExampleComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
