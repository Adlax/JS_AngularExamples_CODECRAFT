import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDnamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ngFor-example',
  template: `
    <h4>NgFor</h4>
    <ul>
      <li *-ngFor="let person of people; let i = index">
        {{ i+1 }} - {{ person.name }}
      </li>
    </ul>
  `
})
class ngForExampleComponent {
  let people: Array<any> = [
    {
      "name": "Douglas Fierce"
    },
    {
      "name": "Gruppert Hevret"
    },
    {
      "name": "Hector Bates"
    }
  ];
}

@Component({
  selector: 'ngFor-Grouped-Example',
  template: `
    <h4>NgFor (grouped) </h4>
    <ul *ngFor="let group of peopleGrouped">
      <li> {{ group.country }} </li>
      <ul>
        <li *ngFor="let person of group.people">
          {{ person.name }}
        </li>
      </ul>
    </ul>
   `
})
class ngForGroupedExampleComponent {
  let peopleGrouped: Array<any> = [
    {
      "country": "UK",
      "people": [
        {
          "name": "Douglas Reed"
        },
        {
          "name": "Henry Stappleton"
        }
      ]
    },
    {
      "country": "US",
      "people": [
        {
          "name": "Victor of the CIA"
        },
        {
          "name": "Herbert Grussendorf"
        }
      ]
    }
  ];
}

@Component({
  selector: 'app',
  template: `
    <ngFor-example></ngFor-example>
    <ngFor-Grouped-Example></ngFor-Grouped-Example>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    ngFor-example,
    ngFor-Grouped-Example,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
