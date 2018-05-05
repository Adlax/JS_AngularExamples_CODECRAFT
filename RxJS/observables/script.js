let obs = Rx.Observable
              .interval(1000)
              .take(3)
              .map( val => Date.now() );

obs.subscribe( val => console.log("Suscribe : ", val) );
