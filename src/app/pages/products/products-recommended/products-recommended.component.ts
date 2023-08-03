import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, CarouselNavigation, Rating, DinamicRating, DinamicReviews, DinamicPrice } from '../../../function';
import { ProductsService } from '../../../services/products.service';

import { ActivatedRoute } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-products-recommended',
  templateUrl: './products-recommended.component.html',
  styleUrls: ['./products-recommended.component.css']
})
export class ProductsRecommendedComponent implements OnInit {

	path:string = Path.url;
	recommendedItems:any[] = [];
	render:boolean = true;
	rating:any[] = [];
	reviews:any[] = [];
    price:any[] = [];
    cargando:boolean = false;
    params:string = null;
  
    constructor(private productsService: ProductsService,
    	         private activatedRoute: ActivatedRoute ) { }

    ngOnInit(): void {

    	this.cargando = true;

    	 //Capturamos el parametro URL
  	this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];

  	//Filtramos data de productos con las categorias

  	this.productsService.getFilterData("category",this.params)
  		.subscribe(resp1 => {

	      if(Object.keys(resp1).length>0){

	          let i;

	         // for(i in resp1){

	          	this.productsFnc(resp1);
	            
	         // }
	      }else{

	        this.productsService.getFilterData("sub_category",this.params)
	          .subscribe(resp2 => {
	        
	            // let i;

	              //  for(i in resp2){

	                    	this.productsFnc(resp2);
	                // }                  
	           })

	      }    	

	 })


    }

    //Declaramos funcion para mostrar los productos recomendados

    productsFnc(response){

    	this.recommendedItems=[];

    	//Hacemos un recorrido por la respuesta que nos traiga el filtrado

    	let i;
    	let getSales = [];

    	for(i in response){

    		getSales.push(response[i]);

    	}

    	//Ordenamos de mayor a menor ventas el arreglo de objetos

    	getSales.sort(function(a,b){

    			return (b.views - a.views)
    	})

    	// Filtramos solo hasta 10 productos

    	getSales.forEach((product,index)=>{

    		if(index < 10){

    			this.recommendedItems.push(product);

    			this.rating.push(DinamicRating.fnc(this.recommendedItems[index]));

    			this.reviews.push(DinamicReviews.fnc(this.rating[index]));

    			this.price.push(DinamicPrice.fnc(this.recommendedItems[index]));


    		}

    		this.cargando = false;

    	})


    }

   
    //Función que avisa cuando finaliza el renderizado de angular

    callback(){

    	if(this.render){

    		this.render = false;

    		OwlCarouselConfig.fnc();
			CarouselNavigation.fnc();
			Rating.fnc();

    	}



    }

}
