import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platformBrowser';
import { platformBrowserDynamic } from '@angular/';

@Component({
  selector: 'ngStyle',
  template:`
    <h4> ngStyle example </h4>
    <ul *ngFor="let person of people">
      <li [ngStyle]="{'font-size.px': 24}" [style.color]="getColor(person.country)"> {{ person.name }} {{ person.country }} </li>
    </ul>
  `
})
class NgStyleExampleComponent {
  people: any[] = [
      {
        "name": "Douglas Pace",
        "country": 'UK'
      },
      {
        "name": "Mcleod Mueller",
        "country": 'USA'
      },
      {
        "name": "Day Meyers",
        "country": 'HK'
      },
      {
        "name": "Aguirre Ellis",
        "country": 'UK'
      },
      {
        "name": "Cook Tyson",
        "country": 'USA'
      }
  ];
  function getColor(country: any): void {
    switch(country) {
      case 'UK': return 'green';
      case 'USA': return 'blue';
      case 'HK': return 'red';
    }
  }
}

@Component({
  selector: 'ngClass',
  template: `
    <h4> ngClass </h4>
    <ul *ngFor="let person of people">
      <li [ngClass]="{
                      'text-success': person.country==='UK',
                      'text-primary': person.country==='USA',
                      'text-danger': person.country==="HK",
                    }"> {{ person.name }} {{ person.country }} </li>
    </ul>
    <!-- ou alors ;
    <h4> ngClass </h4>
    <ul *ngFor="let person of people">
      <li [class.text-success]="person.country==='UK'"
          [class.text-primary]="person.country==='USA'"
          [class.text-danger]="person.country==='HK'"> {{ person.name }} {{ person.country }}
      </li>
    </ul>
    -->
  `
})
class NgClassExampleComponent {
  people: any[] = [
      {
        "name": "Douglas Pace",
        "age": 35,
        "country": 'UK'
      },
      {
        "name": "Mcleod Mueller",
        "age": 32,
        "country": 'USA'
      },
      {
        "name": "Day Meyers",
        "age": 21,
        "country": 'HK'
      },
      {
        "name": "Aguirre Ellis",
        "age": 34,
        "country": 'UK'
      },
      {
        "name": "Cook Tyson",
        "age": 32,
        "country": 'USA'
      }
  ];
}

@Component({
  selector: 'app',
  template: `
    <ngStyle></ngStyle>
    <ngClass></ngClass>
  `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    NgStyleExampleComponent,
    NgClassExampleComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
