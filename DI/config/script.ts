import { NgModule, Component, Inject, Injectable, TypeDecorator } from '@angular/core';
import {  BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

class OtherService {
  constructor(){
  };
}


<!--

//version qui ne marche pas car angular ne sait pas qu il faut injecter OtherService
class SimpleService {
  otherService: OtherService;
  constructor(otherService: OtherService){
    this.otherService = otherService;
  };
}

//cette version marche mais ici on decore a l interieur des parametres du constructeur par @Inject(NonDuToken)
class SimpleService{
  otherService: OtherService;
  constructor(@Inject(OtherService) otherService: OtherService){
    this.otherService = otherService;
  };
}

//ici, on utilise le decorateur @Injectable avant la classe qui fait l equivalent du @Inject pour tous les parametres du constructor
@Injectable()
class SimpleService {
  otherService: OtherService;
  constructor(otherService: OtherService){
    this.otherService = otherService;
  };
}

// ca ca marche pas car le TypeScript token/type associe au parametre (instance) n est pas connu/defini dans l injecteur
@Injectable()
class SimpleService {
  otherService: OtherService;
  constructor(otherService: any){
    this.otherService = otherService;
  };
}

//la meilleure facon, c est de laisser angular faire la reconnaissamce des tokens automatiquement
//car quand on decore une classe avec un deco angular genre @Component ou @Directive c est fait automatiquement
//comme si ca contenait @Injectable

-->


@Injectable()
class SimpleService {
  otherService: OtherService;
  constructor(otherService: OtherService){
    this.otherService = otherService;
  };
}

@Component({
  selector: 'simple',
  template: `
    <p>Simple mon frere!</p>
  `
})
class SimpleComponent {
  constructor(private simpleService: SimpleService){
  };
}

@Component({
  selector: 'app',
  template: `
    <simple></simple>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent,SimpleComponent],
  bootstrap: [AppComponent],
  providers: [SimpleService, OtherService],
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
