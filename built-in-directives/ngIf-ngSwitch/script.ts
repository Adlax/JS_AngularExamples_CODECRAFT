import { plaformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'ngif-example',
  template: `
    <h4> ngIf example </h4>
    <ul *ngFor="let person of people">
      <li *ngIf="person.age<30"> {{ person.name }} {{ person.age }} </li>
    </ul>
  `
})
class ngIfExampleComponent {
  let people: any[] = [
    {
      "name": "Herbie Hancock",
      "age": 232
    },
    {
      "name": "Mcleod Mueller",
      "age": 32
    },
    {
      "name": "Day Meyers",
      "age": 21
    },
    {
      "name": "Aguirre Ellis",
      "age": 34
    },
    {
      "name": "Cook Tyson",
      "age": 32
    }
  ];
}

@Component({
  selector: 'ngswitch-example',
  template:`
    <h4> ngSwitch example </h4>
    <ul *ngFor="let person of people" [ngSwitch]="person.country">
      <li class="text-success" *ngSwitchCase="'UK'" > {{ person.name }} {{ person.country }} </li>
      <li class="text-primary" *ngSwitchCase="'USA'" > {{ person.name }} {{ person.country }} </li>
      <li class="text-danger" *ngSwitchCase="'HK'" > {{ person.name }} {{ person.country }} </li>
      <li class="text-warning" *ngSwitchDefault > {{ person.name }} {{ person.country }} </li>
    </ul>
  `
})
class ngSwitchExampleComponent {
  let people: any[] = [
    {
      "name": "Douglas Pace",
      "age": 35,
      "country": 'MARS'
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
    <ngif-example></ngif-example>
    <ngswitch-example></ngswitch-example>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    ngIfExampleComponent,
    ngSwitchExampleComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
