import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-pipes',
  template: `
    <div class="card card-block">
      <h4 class="card-title">Currency</h4>
      <div class="card-text">
        <p ngNonBindable>{{ 1234.56 | currency: 'CAD' }}</p>
        <p>{{ 1234.56 | currency: "CAD" }}</p>
        <p ngNonBindable>{{ 1234.56 | currency: 'CAD': 'code' }}</p>
        <p>{{ 1234.56 | currency: 'CAD': 'code' }}</p>
        <p ngNonBindable>{{ 1234.56 | currency: 'CAD': 'symbol' }}</p>
        <p>{{ 1234.56 | currency: 'CAD': 'symbol' }}</p>
        <p ngNonBindable>{{ 1234.56 | currency: 'CAD': 'symbol-narrow' }}</p>
        <p>{{ 1234.56 | currency: 'CAD': 'symbol-narrow' }}</p>
      </div>
    </div>

    <div class="card card-block">
      <h4 class="card-title">Date</h4>
      <div class="card-text">
        <p ngNonBindable>{{ dateVal | date: 'shortTime' }}</p>
        <p>{{ new Date() | date: 'shortTime' }}</p>
        <p ngNonBindable>{{ dateVal | date: 'fullTime' }}</p>
        <p>{{ 1234.56 | date: 'fullTime' }}</p>
        <p ngNonBindable>{{ dateVal | date: 'shortTime' }}</p>
        <p>{{ 1234.56 | date: 'shortTime' }}</p>
        <p ngNonBindable>{{ dateVal | date: 'd/m/y' }}</p>
        <p>{{ 1234.56 | date: 'd/m/y' }}</p>
      </div>
    </div>

    <div class="card card-block">
      <div class="card-text">
        <h4 class="card-title">DecimalPipe(number)</h4>
        <p ngNonBindable>{{ 3.14159265 | number: '3.1-2'}}</p>
        <p>{{ 3.14159265 | number: '3.1-2'}}</p>
        <p ngNonBindable>{{ 3.14159265 | number: '1.4-4'}}</p>
        <p>{{ 3.14159265 | number: '1.4-4'}}</p>
      </div>
    </div>

    <div class="card card-block">
      <h4 class="card-title">JSON Pipe(json)</h4>
      <div class="card-text">
        <p ngNonBindable>{{ jsonVal }}</p>
        <p>{{ jsonVal }}</p>
        <p ngNonBindable>{{ jsonVal | json }}</p>
        <p>{{ jsonVal | json }}</p>
      </div>
    </div>

    <div class="card card-block">
      <h4 class="card-title">LowerCasePipe</h4>
      <div class="card-text">
        <p ngNonBindable>{{ 'ADLAX' | lowercase }}
        <p> {{ 'ADLAX' | lowercase }}
      </div>
    </div>

    <div class="card card-block">
      <h4 class="card-title">UpperCasePipe</h4>
      <div class="card-text">
        <p ngNonBindable>{{ 'adlax' | uppercase }}
        <p> {{ 'adlax' | uppercase }}
      </div>
    </div>

    <div class="card card-block">
      <h4 class="card-title">PercentPipe</h4>
      <div class="card-text">
        <p ngNonBindable>{{ 0.123456 | percent }}</p>
        <p>{{ 0.123456 | percent }}</p>
        <p ngNonBindable>{{ 0.123456 | percent: '2.1-2' }}</p>
        <p>{{ 0.123456 | percent: '2.1-2' }}</p>
        <p ngNonBindable>{{ 0.123456 | percent: '10.4-4' }}</p>
        <p>{{ 0.123456 | percent: '10.4-4' }}</p>
      </div>
    </div>

    <div class="">
      <h4 class="">SlicePipe</h4>
      <div class="">
        <p ngNonBindable>{{ [1,2,3,4,5,6] | slice:1:3 }}</p>
        <p>{{ [1,2,3,4,5,6] | slice:1:3 }}</p>
        <p ngNonBindable>{{ [1,2,3,4,5,6] | slice:2 }}</p>
        <p>{{ [1,2,3,4,5,6] | slice:2 }}</p>
        <p ngNonBindable>{{ [1,2,3,4,5,6] | slice:2:-1 }}</p>
        <p>{{ [1,2,3,4,5,6] | slice:2:-1 }}</p>
        <ul>
          <li *ngFor="let val of [1,2,3,4,5,6] | slice:2:-1"> {{ val }} </li>
        </ul>
      </div>
    </div>
  `
})
class PipesComponent {
  private dateVal = new Date();
  private jsonVal = { moo: 'foo', goo: {too: 'new'} };
}


@Component({
  selector: 'app',
  template: '<app-pipes></app-pipes>'
})
class AppComponent {

}


@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, PipesComponent],
  bootstrap: [AppModule]
})
class AppModule {

}


platformBrowserDynamic().bootstrapModule(AppModule);
