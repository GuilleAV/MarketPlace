import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.css']
})
export class HomePromotionsComponent implements OnInit {

 path:string = Path.url;
 banner_default:any[] = [];
 category:any[] = [];
 url:any[] = [];
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

			if(size>2) {

				index = Math.floor(Math.random()*(size-2));

			}

			//seleccionar datos de productos utilizando los limites

			this.productsService.getLimitData(Object.keys(resp)[index],2)
			.subscribe(resp => {

				let i;

				for(i in resp){

					this.banner_default.push(resp[i].default_banner);
					this.category.push(resp[i].category);
					this.url.push(resp[i].url);		

					this.preload = false;
		

				}
			})

		})


  }

 }
