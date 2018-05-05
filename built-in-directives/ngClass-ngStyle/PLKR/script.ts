import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


@Component({
  selector: 'ngStyle-example',
  template: `
    <h4>NgStyle</h4>
    <ul *ngFor="let person of people">
      <li [ngStyle]="{'font-size.px':24}" [style.color]="getColor(person.country)">
        {{ person.name }} ({{ person.country }})
      </li>
    </ul>
`
})
class NgStyleExampleComponent {
  people: any[] = [
    {
      "name": "Douglas  Pace",
      "country": 'UK'
    },
    {
      "name": "Mcleod  Mueller",
      "country": 'USA'
    },
    {
      "name": "Day  Meyers",
      "country": 'HK'
    },
    {
      "name": "Aguirre  Ellis",
      "country": 'UK'
    },
    {
      "name": "Cook  Tyson",
      "country": 'USA'
    }
  ];
  getColor(country) {
    switch (country) {
        case 'UK': return 'green';
        case 'USA':return 'blue';
        case 'HK': return 'red';
    }
  }
}


@Component({
  selector: 'directives-app',
  template: `
    <ngStyle-example></ngStyle-example>
 `
})
class DirectivesAppComponent {
}


@NgModule({
  imports: [BrowserModule],
  declarations: [
    NgStyleExampleComponent,
    DirectivesAppComponent],
  bootstrap: [DirectivesAppComponent]
})
class AppModule {

}


platformBrowserDynamic().bootstrapModule(AppModule);
