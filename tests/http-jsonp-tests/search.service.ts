import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
//import { Promise } from '@angular';
import 'rxjs/add/operator/toPromise';

export class SearchItem {
  constructor(public name: string,
              public artist: string,
              public thumbnail: string,
              public artistId: string) {
              }
}

@Injectable()
export class SearchService {
  public apiRoot: string = "https://itunes.apple.com/search";
  public results: SearchItem[];
  constructor(private jsonp: Jsonp){
    this.results = [];
  }
  search(term: string) {
    return Promise( (resolve, reject) => {
      let apiUrl: string = "${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK";
      this.jsonp.request(apiUrl)
                .toPromise()
                .then(
                  res => {
                    this.results = res.json().results.map( item => {
                      console.log(item);
                      return new SearchItem(item.trackName, item.artistName, item.artworkUrl60, item.artistId);
                    });
                    resolve(results);
                  },
                  msg => {
                    reject(msg);
                  });
    });
  }

}
