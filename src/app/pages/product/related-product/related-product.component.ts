import { Component, OnInit } from '@angular/core';

import { Path } from '../../../config';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, OwlCarouselConfig, CarouselNavigation } from '../../../function';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {

 	path:string = Path.url;
	products:any[] = [];
	rating:any[] = [];
	reviews:any[] = [];
    price:any[] = [];
    cargando:boolean = false;
    render:boolean = true;

	constructor(private productsService: ProductsService,
    	         private activatedRoute: ActivatedRoute ) { }


	ngOnInit(): void {

		this.cargando = false;

		this.productsService.getFilterData("url", this.activatedRoute.snapshot.params["param"])
		.subscribe(resp => {

			for(const i in resp){

				this.productsService.getFilterData("category", resp[i].category)
				.subscribe(resp => {

					this.productsFnc(resp);
				})



			}
		})
	}

	//Declaramos funcion para mostrar los productos recomendados

    productsFnc(response){

    	this.products=[];

    	//Hacemos un recorrido por la respuesta que nos traiga el filtrado

    	let i;
    	let getProduct = [];

    	for(i in response){

    		getProduct.push(response[i]);

    	}

    	//Ordenamos de mayor a menor views el arreglo de objetos

    	getProduct.sort(function(a,b){
    		return(b.views - a.views)
    	})

    	// Filtramos el producto

    	getProduct.forEach((product,index)=>{ 

    		if(index < 10){

    			this.products.push(product);

    			this.rating.push(DinamicRating.fnc(this.products[index]));

    			this.reviews.push(DinamicReviews.fnc(this.rating[index]));

    			this.price.push(DinamicPrice.fnc(this.products[index]));  
    		}

    		this.cargando = true;

    	})

    }

    callback(){

    	if(this.render){

    		this.render =  false;

    		setTimeout(function(){

    			OwlCarouselConfig.fnc();

    			CarouselNavigation.fnc();

    			Rating.fnc();
    		},1000)

    		
    	}
    }


}
