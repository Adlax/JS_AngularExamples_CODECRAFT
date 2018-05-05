import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'form-app',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">

      <!-- Output Comment -->
      <div class="card card-block">
        <pre class="card-text"> {{ form.value.comment }} </pre>
      </div>
      <p class="small"> {{ form.value.lastUpdateTS }} </p>

      <!-- Comment Text Area -->
      <div class="form-group">
        <label for="comment"> Comment </label>
        <textarea class="form-control" formControlName="comment" rows="3"> </textarea>
        <small class="form-text text-muted">  <span>{{ 100 - form.value.comment.length }}</span>  characters left </small>
      </div>

      <!-- Name Input -->
      <div class="form-group">
        <label for="name"> Name </label>
        <input type="text" class="form-control" formControlName="name" placeholder="Enter name here..."> </input>
      </div>

      <!-- e-Mail Input -->
      <div class="form-group">
        <label for="email"> e-Mail </label>
        <input type="text" class="form-control" formControlName="email" placeholder="e-mail here..."></input>
        <small class="form-text text-muted"> We don t share e-mails (at least that s what we have to say) </small>
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="!form.valid"> Submit! </button>

    </form>
    <!-- on aurait pu foutre tout ca dans un fichier template separe -->
  `
})
class FormAppComponent {
  form: FormGroup;
  comment = new FormControl("", Validators.required);
  name = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required, Validators.pattern("[^ @]*@[^ @]*"));
  /* Observable Solution */
  constructor(fb: FormBuilder){
    this.form = fb.group({
      "comment": this.comment,
      "name": this.name,
      "email": this.email
    });
    this.form.valueChanges
      .filter( data => this.form.valid )
      .map( data => {
        data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
        return data;
      })
      .map( data => {
        data.lastUpdateTS = new Date();
        return data;
      })
      .subscribe( data => console.log(JSON.stringify(data)) );
  }
  /*
  <!-- None Observable Solution -->
  constructor(fb: FormBuilder){
    this.form = fb.group({
      "comment": this.comment,
      "name": this.name,
      "email": this.email
    });
    this.form.valueChanges
      .subscribe( data => {
        if(this.form.valid){
          data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
          data.lastUpdateTS = new Date();
          console.log(JSON.stringify(data));
        }
      });
  }
  */
  onSubmit(){
    console.log("Form has been submited");
  }
}

@Component({
  selector: 'app',
  template:`
    <form-app></form-app>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    FormAppComponent
  ]
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
