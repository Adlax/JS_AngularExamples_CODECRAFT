import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ngfor-example',
  template: `<h4>NgFor</h4>
<ul>
  <li *ngFor="let person of people; let i = index">
    {{ i + 1 }} - {{ person.name }}
  </li>
</ul>
 `
})
class NgForExampleComponent {
  people: any[] = [
    {
      "name": "Douglas  Pace"
    },
    {
      "name": "Mcleod  Mueller"
    },
    {
      "name": "Day  Meyers"
    },
    {
      "name": "Aguirre  Ellis"
    },
    {
      "name": "Cook  Tyson"
    }
  ];
}

@Component({
  selector: 'ngFor-Grouped-Example',
  template: `
    <h4>NgFor (grouped) </h4>
    <ul *ngFor="let group of peopleByCountry">
      <li> {{ group.country }} </li>
      <ul>
        <li *ngFor="let person of group.people">
          {{ person.name }}
        </li>
      </ul>
    </ul>
   `
})
class NgForGroupedExampleComponent {
  peopleByCountry: any[] = [
    {
      'country': 'UK',
      'people': [
        {
          "name": "Douglas  Pace"
        },
        {
          "name": "Mcleod  Mueller"
        },
      ]
    },
    {
      'country': 'US',
      'people': [
        {
          "name": "Day  Meyers"
        },
        {
          "name": "Aguirre  Ellis"
        },
        {
          "name": "Cook  Tyson"
        }
      ]
    }
  ];
}

@Component({
  selector: 'app',
  template: `
    <ngfor-example></ngfor-example>
    <ngFor-Grouped-Example></ngFor-Grouped-Example>
  `
})
class DirectivesAppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    NgForExampleComponent,
    NgForGroupedExampleComponent,
    DirectivesAppComponent],
  bootstrap: [DirectivesAppComponent],
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
