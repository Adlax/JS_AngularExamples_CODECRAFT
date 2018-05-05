import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ngNonBindable',
  template:`
    <div>
      To render the name variable we use this syntax <pre ngNonBindable> {{ name }} </pre>
    </div>
  `
})
class NgNonBindableExampleComponent {}


@Component({
  selector: 'dir-app',
  template: ` <ngNonBindable></ngNonBindable> `,
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
class AppModule {

}


platformBrowserDynamic().bootstrapModule(AppModule);
