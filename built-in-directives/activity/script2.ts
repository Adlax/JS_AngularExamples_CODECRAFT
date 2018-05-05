import { platformBrowserDynamic } from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/';

class Article {
  public cat: string;
  public title: string;
  public content: string;
  public date: Date;
  constructor(cat: string, title: string, content: string){
    this.cat = cat;
    this.title = title;
    this.content = content;
    this.date = new Date();
  }
}

@Component({
  selector: 'articles-list',
  template: `
    <div class="col-md-4" *ngFor="let article of articles">
      <div class="card" [ngClass]="{ 'card-outline-primary': article.cat === 'text',
                                    'card-outline-danger': article.cat === 'image'}">
        <div class="block-card">
          <h4> {{ article.title }} </h4>
          <p class="card-text" *ngIf="article.cat==='text'"> {{ article.content }} </p>
          <p class="card-text"> <small class="text-muted"> Last muted {{ article.date | date: "shortDate" }} </small> </p>
        </div>
        <img class="card-img-bottom img-fluid" *ngIf="article.cat==='image'" src="{{ article.content }}">
      </div>
    </div>
  `
})
class ArticlesListComponent implements OnInit {
  articles: Article[];
  NgOnInit(){
    this.articles = [
      new Article('image', 'Sweden', 'http://maxpixel.freegreatpicture.com/Gota-River-Winter-Sun-Water-Winter-Morning-Sweden-1980673'),
      new Article('text', 'Poem', 'blablablabla'),
    ];
  }
}

@Component({
  selector: 'app',
  template: `
    <div class="">
      <articles-list></articles-list>
    </div>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesListComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
