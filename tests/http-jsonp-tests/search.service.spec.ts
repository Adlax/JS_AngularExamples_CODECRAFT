import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockBackEnd } from '@angular/http/testing';
import { SearchService } from './search.service';
import { Http, Jsonp, JsonpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

describe('Test entre client et faus serveur', () => {
  let service: SearchService;
  let backEnd: MockBackEnd;
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      declarations: [
        SearchService,
        MockBackEnd,
        BaseRequestOptions,
        {
          provide: Jsonp,
          useFactory: (backend,options) => new Jsonp(backend, options),
          deps: [MockBackEnd, BaseRequestOptions],
        }
      ],
    });
    backEnd = TestBed.get(MockBackEnd);
    service = TestBed.get(SearchService);
  });
  it('verif de la bonne connexion', fakeAsync (() => {
    let response = {
      "resultCount": 1,
      "results": [
        {
          "trackName": "Kiss me kill me",
          "artistName": "U2",
          "artworkUrl60": "image3.jpg",
          "artistId": 78500,
        }
      ],
    };
    backEnd.connections.subscribe( (connection) => {
      connection.mockRespond(new Response(<ResponseOptions>{body: JSON.stringify(response)}));
    });
    service.search("U2 caca");
    tick();
    expect(service.results.length).toBe(1);
    expect(service.results[0].name).toBe("Kiss me kill me");
    expect(service.results[0].artist).toBe("U2");
    expect(service.results[0].thumbnail).toBe("image3.jpg");
    expect(service.results[0].artistId).toBe(78500);
  }));
});
