import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
        Component,
        Directive,
        NgModule,
        Input,
        Output,
        EventEmitter,
        TemplateRef,
        ViewContainerRef,
        Renderer,
        ElementRef,
        HostListener,
        HostBinding
       } from '@angular/core';import {BrowserModule} from '@angular/platform-browser';

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

@Directive({
  selector: '[ccRollOver]',
})
class RollOverImageDirective {
  @HostBinding('class.card-outline-primary') private isHovering: boolean;
  @Input('ccRollOver') config: Object = {
    initial: '',
    over: 'https://unsplash.it/200/300?image=202'
  };
  constructor(private el: ElementRef, private renderer: Renderer){

  }
  @HostListener('mouseover') onMouseOver(){
    let part = this.el.nativeElement.querySelector('img');
    this.renderer.setElementStyle(part, 'display', this.config.over);
    this.isHovering = true;
  }
  @HostListener('mouseout') onMouseOut(){
    let part = this.el.nativeElement.querySelector('img');
    this.renderer.setElementStyle(part, 'display', this.config.initial);
    this.isHovering = false;
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
          <p class="card-text"> <small class="text-muted"> Last updated {{ article.date | date: "shortDate" }} </small> </p>
        </div>
        <img class="card-img-bottom img-fluid" *ngIf="article.cat==='image'" src="{{ article.content }}" >
      </div>
    </div>
  `
})
class ArticlesListComponent {
  articles: Article[] = [
      new Article('image', 'Sweden', 'https://i.ytimg.com/vi/Y1rNe1iytM8/maxresdefault.jpg'),
      new Article('text', 'Poem', 'If you aren\'t rich you should always look useful.'),
      new Article('image', 'Space', 'https://www.nasa.gov/images/content/549307main_pia14093-43_946-710.jpg'),

    ];
}

@Component({
  selector: 'app',
  template: `
    <div class="row">
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
    ArticlesListComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
