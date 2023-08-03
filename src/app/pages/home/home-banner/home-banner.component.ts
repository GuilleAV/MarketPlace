import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { OwlCarouselConfig, BackgroundImage } from '../../../function';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

 path:string = Path.url;
 banner_home:any[] = [];
 category:any[] = [];
 url:any[] = [];
 render:boolean = true;
 preload:boolean = false;


constructor(private productsService: ProductsService) { }

ngOnInit(): void {

	this.preload = true;

	let index = 0;

	this.productsService.getData()
	.subscribe(resp => {

		//Toma la longitud del objeto

		let i;
		let size = 0;

		for(i in resp) {
			size++;
		}

		//genero un numero de aleatorio si el tamaño de los datos es superior a 5

		if(size>5) {

			index = Math.floor(Math.random()*(size-5));

		}

		//seleccionar datos de productos utilizando los limites

		this.productsService.getLimitData(Object.keys(resp)[index],5)
		.subscribe(resp => {

			let i;

			for(i in resp){

				this.banner_home.push(JSON.parse(resp[i].horizontal_slider));
				this.category.push(resp[i].category);
				this.url.push(resp[i].url);

				this.preload = false;

			}
		})

	})

}
	// funcion que me avisa cuando angular termina de renderizar el html

	callback(){

		if(this.render){

			this.render = false;

			OwlCarouselConfig.fnc();
			BackgroundImage.fnc();

		}

	}



}
