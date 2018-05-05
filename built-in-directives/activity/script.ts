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
    this.date = Date();
  }
}

@Component({
  selector: 'article',
  template: `
    <div *ngIf="article.cat===text">
      <div class="">
        <p> {{ article.title }} </p>
        <p> {{ article.text }} </p>
        <p> <i>Last updated {{ article.date|shortDate }}</i> </p>
      </div>
    </div>
    <div *ngIf="article.cat===image">
      <div class="">
        <p> {{ article.title }} </p>
        <p> <i>Last updated {{ article.date|shortDate }}</i> </p>
        <img src=""></img>
      </div>
    </div>
  `
})
class ArticleComponent {
  article: Article;
}

@Component({
  selector: 'articles-list',
  template: `
    <article *ngFor="let artcl of articles"> </article>
  `
})
class ArticlesListComponent implements OnInit {
  articles: Article[];
  NgOnInit(){
    this.articles = [
      new Article(),
      new Article(),
      new Article(),
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
