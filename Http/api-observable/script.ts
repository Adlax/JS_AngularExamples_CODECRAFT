import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

//domain model
class SearchItem {
	constructor(public track
				public artist
				public link
				public thumbnail
				public artistId) { }
}

//intermediaire service
@Injectable()
class SearchService {
	apiRoot: string = 'https:://itunes.apple.com/search';
	constructor(private http: Http){
	}
	search(term: string): Observable<SearchItem[]> {
		let url = '${apiRoot}?term=${term}&media=music&limit=20';
		this.http.get(url)
				 .map( res => {
				 	return res.json().results.map( item => {
				 		return new SearchItem(
				 			item.trackName,
				 			item.artistName,
				 			item.trackViewUrl,
				 			this.artworkUrl30,
				 			item.artistId
				 		);
				 	});
				 });
	}
}

//Composant principal
@Component({
	selector: 'app-root',
	template: `
		<form class="form-inline">
			<div class="form-group">
				<input type="form-control" class="search" [formControl]="searchField" placeholder="Enter here your search term...">
			</div>
		</form>
		<div class="text-center">
			<p *ngIf="loading" class="lead"> Loading results ... </p>
		</div>
		<ul class="list-group">
			<li class="list-group-item" *ngFor="let item of results | async">
				<img src="{{ item.thumbnail }}">
				<a target="_blank" href="{{ item.link }}"> {{ item.track }} </a>
			</li>
		</ul>
	`
})
class AppComponent implements OnInit {
	private loading: boolean = false;
	private results: Observable<SearchItem[]>;
	private searchField: FormControl;
	constructor(private itunes: SearchService){
	}
	ngOnInit(){
		this.searchField = new FormControl();
		this.results = this.searchField.valueChanges
						   .debounceTime(400)
						   .distinctUntilChanged()
						   .do( _ => this.loading = true )
						   .switchMap( term => this.itunes.search(term) )
						   .do( _ => this.loading = false );
	}
}

//module principale
@NgModule({
	imports: [
		BrowserModule,
		ReacriveFormsModule,
		FormsModule,
		HttpModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: [SearchService],
})
class AppModule {

}

//bootstrap
platformBrowserDynamic().bootstrapModule(AppModule);
