import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, Pagination, Select2Cofig, Tabs } from '../../../function';

import { ActivatedRoute } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.css']
})
export class ProductsShowcaseComponent implements OnInit {

	path:string = Path.url;
	products:any[] = [];
	rating:any[] = [];
	reviews:any[] = [];
  price:any[] = [];
	render:boolean = true;
	cargando:boolean = false;
	params:string = null;
	page;
	productFound:number = 0;
	currentRoute:string = null;
	totalPage:number = 0;
	sort;
	sortItems:any[] = [];
	sortValues:any[]=[];



  	constructor(private productsService: ProductsService,
    	         private activatedRoute: ActivatedRoute) { }

  	ngOnInit(): void {

  		this.cargando = true;

  		//Capturamos el parametro URL
  		this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];
  		this.sort = this.activatedRoute.snapshot.params["param"].split("&")[1];
  		this.page = this.activatedRoute.snapshot.params["param"].split("&")[2];

  		//Evaluamos que segundo parámetro sea de paginación

  		if(Number.isInteger(Number(this.sort))){

  			this.page = this.sort;
  			this.sort = undefined;
  		}

  		// Cuando sort no esta definido

  		if(this.sort == undefined){

			this.currentRoute = `products/${this.params}`;

  		}else{

  			this.currentRoute = `products/${this.params}&${this.sort}`;
  		}

  		

  		//Filtramos data de productos con las categorias

	  	this.productsService.getFilterData("category",this.params)
	  		.subscribe(resp1 => {

		      if(Object.keys(resp1).length>0){

		          //let i;

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

	    //Declaramos funcion para mostrar el catálogo de productos

	    productsFnc(response){

	    this.products=[];

    	//Hacemos un recorrido por la respuesta que nos traiga el filtrado

    	let i;
    	let getProducts = [];

    	for(i in response){

    		getProducts.push(response[i]);

    	}

    	//Definimos el total de productos y la paginación

    	this.productFound = Number(getProducts.length);
    	this.totalPage = Math.ceil(Number(getProducts.length)/6);

    	//Ordenamos el arreglo de objetos de lo mas actual a lo mas antiguo

    	if(this.sort == undefined || this.sort == "first"){

    		getProducts.sort(function(a,b){

    			return (b.date_created - a.date_created)
    		})

    		this.sortItems = [
    			"Sort by first",
				"Sort by latest",
				"Sort by popularity",        
				"Sort by price: low to high",
				"Sort by price: high to low"

    		]

    		this.sortValues = [
    			"first", 
				"latest",
				"popularity",     
				"low",
				"high"
    		]
    	}


		//Ordenamos el arreglo de objetos de lo mas antiguo a lo mas actual

    	if(this.sort == "latest"){

    		getProducts.sort(function(a,b){

    			return (a.date_created - b.date_created)
    		})

    		this.sortItems = [

				"Sort by latest",
				"Sort by popularity",        
				"Sort by price: low to high",
				"Sort by price: high to low",
				"Sort by first"
    		]

    		this.sortValues = [    			
				"latest",
				"popularity",     
				"low",
				"high",
				"first"
    		]
    	}

    	//Ordenamos el arreglo de objetos por los mas vistos

    	if(this.sort == "popularity"){

    		getProducts.sort(function(a,b){

    			return (b.views - a.views)
    		})

    			this.sortItems = [
				
				"Sort by popularity",        
				"Sort by price: low to high",
				"Sort by price: high to low",
				"Sort by first",
				"Sort by latest"
    		]

    		this.sortValues = [			
				
				"popularity",     
				"low",
				"high",
				"first",
				"latest"
    		]


    	}

    	//Ordenamos el arreglo de objetos de menor a mayor precio

    	if(this.sort == "low"){

    		getProducts.sort(function(a,b){

    			return (a.price - b.price)
    		})

    		this.sortItems = [			
			     
				"Sort by price: low to high",
				"Sort by price: high to low",
				"Sort by first",
				"Sort by latest",
				"Sort by popularity"
    		]

    		this.sortValues = [				
				
				"low",
				"high",
				"first",
				"latest",
				"popularity"
    		]
    	}

    	//Ordenamos el arreglo de objetos de mayor a menor precio

    	if(this.sort == "high"){

    		getProducts.sort(function(a,b){

    			return (b.price - a.price)
    		})

    		this.sortItems = [     
				
				"Sort by price: high to low",
				"Sort by first",
				"Sort by latest",
				"Sort by popularity",
				"Sort by price: low to high"
    		]

    		this.sortValues = [				
				
				"high",
				"first",
				"latest",
				"popularity",
				"low"
    		]
    	}

    	// Filtramos solo hasta 6 productos

    	getProducts.forEach((product,index)=>{

		//Evaluamos si viene numero de página definida
    		if(this.page == undefined){

    			this.page = 1;
    		}

    	// Configuramos la paginación desde hasta

    		let first = Number(index) + (this.page*6)-6;
    		let last = 6*this.page;

    		if(first < last){

    			if(getProducts[first] != undefined){

    				this.products.push(getProducts[first]);

    				this.rating.push(DinamicRating.fnc(getProducts[first]));

    				this.reviews.push(DinamicReviews.fnc(this.rating[index]));

    				this.price.push(DinamicPrice.fnc(getProducts[first]));

    			}    			

    		}

    		this.cargando = false;
    

    	})



	}

	 //Función que avisa cuando finaliza el renderizado de angular

    callback(params){

    	if(this.render){

    		this.render = false;

			Rating.fnc();
			Pagination.fnc();
			Select2Cofig.fnc();
      Tabs.fnc();

			//Captura del select sort items

			$(".sortItems").change(function() {

				window.open(`products/${params}&${$(this).val()}`,'_top')

			});


    	}



    }

}
