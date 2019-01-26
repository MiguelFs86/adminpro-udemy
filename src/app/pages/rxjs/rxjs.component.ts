import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

	subcription: Subscription;
	
	constructor() {
		this.subcription = this.regresaObservable()
		.subscribe( 
			(numero) => { console.log('Subs: ',numero) },
			(error) => {console.log(error)},
			() => { console.log('Terminó!')}
		);
	}
	
	ngOnInit() {
	}

	ngOnDestroy(){
	this.subcription.unsubscribe();
	}

	regresaObservable(): Observable<any>{
		return new Observable( (observer: Subscriber<any>) => {
			let contador = 0;
			const intervalo = setInterval( () => {
				contador ++;

				const salida = {
					valor: contador
				};
				observer.next(salida);

				// if (contador === 3){
				// 	clearInterval(intervalo);
				// 	observer.complete();
				// }

				// if (contador === 2){
				// 	//clearInterval(intervalo);
				// 	observer.error('Error happens');
				// }
			},1000);
		}).pipe(
			retry(2),
			map( resp =>{
				return resp.valor;
			}),
			filter( (resp, index) => {
				if ((resp % 2) === 1){
					return true;
				} else{
					return false;
				}
			})
		);
	}
	
}
