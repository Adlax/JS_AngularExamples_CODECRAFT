import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

class Signup {
  constructor(
    public firstName: string = '';
    public lastName: string = '';
    public email: string = '';
    public password: string = '';
    public language: string = '';
  ) {}
}

@Component({
  selector: 'template-form',
  template: `
  <form novalidate (ngSubmit)="onSubmit()" #f="ngForm">
    <!-- name group -->
    <fieldset ngModelGroup="name">
      <!-- first name -->
      <div class="form-group" [ngClass]="{
                                        'has-success': firstName.valid && (firstName.touched || firstName.dirty),
                                        'has-danger': firstName.invalid && (firstName.touched || firstName.dirty),
                                        }">
          <label>First name</label>
          <input type="text" class="form-control" name="firstName" [(ngModel)]="model.firstName" required #firstName="ngModel">
          <div class="form-control-feedback" *ngIf="firstName.errors && (firstName.dirty || firstName.touched)">
            <p *ngIf="firstName.errors.required">First name is required</p>
          </div>
      </div>
      <!-- last name -->
      <div class="form-group" [ngClass]="{
                                        'has-success': lastName.valid && (lastName.dirty || lastName.touched),
                                        'has-danger': lastName.invalid && {lastName.dirty || lastName.touched}
                                          }">
          <label>Last name</label>
          <input type="text" class="form-control" name="lastName" [(ngModel)]="model.lastName" required #lastName="ngModel">
          <div class="form-control-feedback" *ngIf="lastName.errors && (lastName.dirty || lastName.touched)">
            <p *ngIf="lastName.errors.required">Last name is required</p>
          </div>
      </div>
    </fieldset>
    <!-- email -->
    <div class="form-group" [ngClass]="{
                                      'has-success': email.valid && (email.dirty || email.touched),
                                      'has-danger': email.invalid && (email.dirty || email.touched)
                                        }">
          <label>e-mail</label>
          <input type="text" class="form-control" name="email" [(ngModel)]="model.email" required pattern="[^ @]*@[^ @]*" #email="ngModel">
          <div class="form-control-feedback" *ngIf="email.errors && (email.dirty || email.touched)">
            <p *ngIf="email.errors.required">email required</p>
            <p *ngIf="email.errors.pattern">email should contain an @</p>
          </div>
    </div>
    <!-- password -->
    <div class="form-group" [ngClass]="{
                                      'has-success': password.valid && (password.dirty || password.touched),
                                      'has-danger': password.invalid && (password.dirty || password.touched)
                                        }">
          <label>password</label>
          <input type="password" class="form-control" name="password" [(ngModel)]="model.password" required minlength="8" #password="ngModel">
          <div class="form-control-feedback" *ngIf="password.errors && (password.touched || password.dirty)">
            <p *ngIf="password.errors.required">password is required</p>
            <p *ngIf="password.errors.minlength">password must contain at least 8 characters </p>
          </div>
    </div>
    <!-- language -->
    <div class="form-group">
          <label>language</label>
          <select class="form-control" name="language" [(ngModel)]="model.language">
            <option value="">Selec your language here</option>
            <option *ngFor="let lang of langs" [value]="lang"> {{ lang }} </option>
          </select>
    </div>
    <!-- submit and reset button -->
    <button type="submit" class="btn btn-primary" [disabled]="f.invalid">Submit</button>
    <!-- debug with an output of the form value jsoned -->
    <pre> {{ f.value | json }} </pre>
  </form>
  `
})
class TemplateFormComponent {
  public model: Signup = new Signup();
  @ViewChild('f') form: any;
  langs = string[] = [
    'Froncais',
    'Nederlands',
    'Zoulou'
  ];
  onSubmit(){
    if(this.form.valid){
      console.log("Form valid and submited");
      this.form.reset();
    }
  }

}

@Component({
  selector: '<app></app>',
  template: `
    <template-form></template-form>
  `
})
class AppComponent {

}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TemplateFormComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
