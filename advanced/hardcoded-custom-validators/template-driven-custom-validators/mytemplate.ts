<form novalidate (ngSubmit)="onSubmit()" #f="ngForm">
      <fieldset ngModelGroup="name">
        <div class="form-group"
             [ngClass]="{
              'has-success': firstName.valid && (firstName.touched || firstName.dirty),
              'has-danger': firstName.invalid && (firstName.touched || firstName.dirty),
             }">
          <label>first name</label>
          <input type="text" class="form-control" name="firstName" [(ngModel)]="model.firstName" required #firstName="ngModel">
          <div class="form-control-feedback" *ngIf="firstName.errors && (firstName.touched || firstName.dirty)">
            <p *ngIf="firstName.errors.required">Field required</p>
          </div>
        </div>
        <div class="form-group"
             [ngClass]="{
               'has-success': lastName.valid && (lastName.dirty || lastName.touched),
               'has-danger': lastName.invalid && (lastName.dirty || lastName.touched),
             }">
          <label>last name</label>
          <input type="text" class="form-control" name="lastName" [(ngModel)]="model.lastName" required #lastName="ngModel">
          <div class="form-control-feedback" *ngIf="lastName.errors && (lastName.dirty || lastName.touched)">
            <p *ngIf="lastName.errors.required"> Field required </p>
          </div>
        </div>
      </fieldset>

      <div class="form-group"
          [ngClass]="{
            'has-success': email.valid && (email.dirty || email.touched),
            'has-danger': email.invalid && (email.dirty || email.touched),
          }">
        <label>eMail</label>
        <input type="text" class="form-control" name="email" [(ngModel)]="model.email" required #email="ngModel">
        <div class="form-control-feedback" *ngIf="email.errors && (email.touched || email.dirty)">
          <p *ngIf="email.errors.required"> Field is required </p>
          <p *ngIf="email.errors.pattern"> email is not valid </p>
          <p *ngIf="email.errors.emailDomain"> email must be in the {{ email.errors.emailDomain.requiredDomain }} domain </p>
        </div>
      </div>

      <div class="form-group"
           [ngClass]="{
             'has-success': password.valid && (password.dirty || password.touched),
             'has-danger': password.invalid && (password.dirty || password.touched),
           }">
        <label>password</label>
        <input type="password" class="form-control" name="password" [(ngModel)]="model.password" required minlength="8" #password="ngModel">
        <div *ngIf="password.errors && (password.touched || password.dirty)">
          <p *ngIf="password.errors.required"> Field is required </p>
          <p *ngIf="password.errors.minlength"> must contqin qt least 8 characters long </p>
        </div>
      </div>

      <div class="form-control">
        <label>Language</label>
        <select class="form-control" name="language" [(ngModel)]="model.language">
          <option [value]="">Choose your language</option>
          <option *ngFor="let lang of langs" [value]="lang"> {{ lang }} </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="f.invalid">Submit</button>

      <pre> {{ f.value | json }} </pre>

    </form>
