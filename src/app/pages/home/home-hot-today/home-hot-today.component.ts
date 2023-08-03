import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';

import { ProductsService } from '../../../services/products.service';
import { SalesService } from '../../../services/sales.service';

import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar} from '../../../function';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

	path:string = Path.url;
	indexes:any[] = [];
	products:any[] = [];
	render:boolean = true;
	cargando:boolean = false;
	topSales:any[] = [];
	topSalesBlock:any[] = [];
	renderBestSeller:boolean = true;

  	constructor(private productsService: ProductsService,
  				private salesService: SalesService	) { }

  	ngOnInit(): void {

  		this.cargando = true;

  		let getProductos:any[] = [];
  		let hoy = new Date();
  		let fechaOferta = null;


  		this.productsService.getData()
		.subscribe(resp => {

			let i;			

			for(i in resp){

				getProductos.push({

					"offer" : JSON.parse(resp[i].offer) ,
					"stock" : resp[i].stock
				})

				this.products.push(resp[i]);

				
			}

			//Recorremos cada oferta y stock para clasificar las ofertas actuales y los productos que tengas stock

			for(i in getProductos){

				fechaOferta = new Date(

					parseInt(getProductos[i]["offer"][2].split("-")[0]),
					parseInt(getProductos[i]["offer"][2].split("-")[1])-1,
					parseInt(getProductos[i]["offer"][2].split("-")[2]),

					);

				if(hoy < fechaOferta && getProductos[i]["stock"]>0){

					this.indexes.push(i);
				//	console.log(getProductos[i]);
					this.cargando=false;

				}

				//console.log(this.indexes.length)

			}	

		})

		// Tomamos la data de las ventas

		let getSales = [];

		this.salesService.getData()
		.subscribe(resp => {

			//recorremos para separar los productos y las cantidades

			let i;

			for(i in resp){

				getSales.push({

					"product":resp[i].product,
					"quantity":resp[i].quantity



				})

			};

			//ordenamos de mayor a menor el arreglo de objetos

			getSales.sort(function(a,b){

				return(b.quantity - a.quantity);
			});

			//sacamos del arreglo los productos repetidos dejando los de mayor venta

			let filterSales = [];

			getSales.forEach(sale => {

				if(!filterSales.find(resp => resp.product == sale.product)){

					const {product, quantity} = sale;

					filterSales.push({product,quantity});
				}

			})

		  // filtramos la data de los productos buscando coincidencias con las ventas

		  let block = 0;

		  filterSales.forEach((sale,index)=>{		  	

		  		//filtramos hasta las 20 ventas

		  		if(index <20){

		  			block++;

		  			this.productsService.getFilterData("name",sale.product)
		  			.subscribe(resp =>{

		  				let i;

		  				for(i in resp){

		  					this.topSales.push(resp[i]);


		  				}


		  			})			

		  		}



		  })

		  // Enviamos el maximo de bloques para mostrar 4 productos por bloque

		  for(let i = 0; i < Math.round(block/4); i++){

		  		this.topSalesBlock.push(i);
		  }		  


		})


  	}

  	// funcion que me avisa cuando angular termina de renderizar el html

	callback(){

		if(this.render){

			this.render = false;

			//seleccionar del DOM los elementos de la galeria Mixta
			let galleryMix_1 = $(".galleryMix_1");
			let galleryMix_2 = $(".galleryMix_2");
			let galleryMix_3 = $(".galleryMix_3");

			//seleccionamos del DOM los elementos de las ofertas
			let offer_1 = $(".offer_1");
			let offer_2 = $(".offer_2");
			let offer_3 = $(".offer_3");

			//seleccionamos del DOM los elementos de las reseñas
			let review_1 = $(".review_1");
			let review_2 = $(".review_2");
			let review_3 = $(".review_3");			

			for(let i=0; i < galleryMix_1.length; i++){
				//recorremos todas las fotografia de la galeria de cada producto

				for(let f=0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length ; f++){

					//agregar imagenes grandes

					$(galleryMix_2[i]).append(

					`<div class="item">
                    	<a href="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
                    		<img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}" >
                    	</a>
                    </div>`

                    )

                    //agregar imagenes pequeñas
					$(galleryMix_3[i]).append(

	                    `<div class="item">
	                    	<img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}" >
	                    </div>`

	                 	)

					}


					// capturamos el array de ofertas de cada producto

					let offer = JSON.parse($(offer_1[i]).attr("offer"));

					// capturamos el precio del producto

					let price = JSON.parse($(offer_1[i]).attr("price"));

					// preguntamos si es descuento

					if(offer[0] == "Disccount"){

						$(offer_1[i]).html(

							`<span>Save <br> $${(price * (offer[1])/100).toFixed(2) }</span>`
						)

						$(offer_2[i]).html(
							`$${(price - (price * (offer[1]/100))).toFixed(2) }`
						)
					};

					// preguntamos si es fijo

					if(offer[0] == "Fixed"){

						$(offer_1[i]).html(

							`<span>Save <br> $${(offer[1])}</span>`

						)


						$(offer_2[i]).html(
						`$${(price - offer[1]).toFixed(2) }`
						)
					};

					//Agregamos la fecha al descontador

					$(offer_3[i]).attr("data-time", 
						new Date(

							parseInt(offer[2].split("-")[0]),
							parseInt(offer[2].split("-")[1])-1,
							parseInt(offer[2].split("-")[2]),

								)
						);


					// Calculamos el total de calificaciones de las reseñas

					let totalReview = 0;

					for(let f=0; f < JSON.parse($(review_1[i]).attr("reviews")).length ; f++){

						totalReview += Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"]);

					};

					//Imprimimos el total de la calicaciones para cada producto

					let rating = Math.round(totalReview / JSON.parse($(review_1[i]).attr("reviews")).length) ;
					
					$(review_3[i]).html(rating);


					for(let f = 1; f<=5 ;f++){

						if(rating >= f){

							$(review_2[i]).append(`<option value="1">${f}</option>`);

						}else{

							$(review_2[i]).append(`<option value="2">${f}</option>`);							

						}					
					}				
					
			};



			OwlCarouselConfig.fnc();
			CarouselNavigation.fnc();
            SlickConfig.fnc();
			ProductLightbox.fnc();
			CountDown.fnc();
			Rating.fnc();
			ProgressBar.fnc();

			

		}

	}

	callbackBestSeller(topSales){

		if(this.renderBestSeller){

			this.renderBestSeller = false;

			//Capturamos la cantidad de bloques que existen en el DOM

			let topSaleBlock = $(".topSaleBlock");	
			let top20Array = [];

			//Ejecutamos un setTimeOut por cada bloque , un segundo de espera

			setTimeout(function(){

				//Removemos el preload

				$(".preload").remove();


				//Hacemos un ciclo	por la cantidad de bloques

				for(let i = 0; i < topSaleBlock.length; i++ ){
				
					//Agrupamos la cantidad de 4 productos por bloque

					top20Array.push(

						topSales.slice(i * topSaleBlock.length,(i * topSaleBlock.length + topSaleBlock.length))

					)

					// Hacemos un recorrido por el nuevo array de objetos
				
					let f;

					for(f in top20Array[i]){

						//Definimos si el precio del producto tiene oferta o no 

						let price;
						let type;
						let value;
						let offer;
						let offerDate;
    					let today = new Date();


						if(top20Array[i][f].offer != ""){

							offerDate = new Date(
				    			parseInt(JSON.parse(top20Array[i][f].offer)[2].split("-")[0]),
				    			parseInt(JSON.parse(top20Array[i][f].offer)[2].split("-")[1])-1,
				    			parseInt(JSON.parse(top20Array[i][f].offer)[2].split("-")[2])
    						)

    						if(today <= offerDate){

								type =  JSON.parse(top20Array[i][f].offer)[0];
								value = JSON.parse(top20Array[i][f].offer)[1];

								if(type == "Disccount"){

									offer = (top20Array[i][f].price - top20Array[i][f].price * (value/100)).toFixed(2);
								}

								if(type == "Fixed"){

									offer = (top20Array[i][f].price - value).toFixed(2);
								}

								price = ` <p class="ps-product__price sale">$${offer} <del>$${top20Array[i][f].price} </del> </p>`
							
					
							}else{

								 price = `<p class="ps-product__price">$${top20Array[i][f].price}</p>`
							}

						}else{

						    price = `<p class="ps-product__price">$${top20Array[i][f].price}</p>`
						}

						//Adicionar a la vista los productos clasificados

						$(topSaleBlock[i]).append(`
							  <div class="ps-product--horizontal">

                                    <div class="ps-product__thumbnail">
                                    	<a href="product/${top20Array[i][f].url}">
                                    		<img src="assets/img/products/${top20Array[i][f].category}/${top20Array[i][f].image}" alt="">
                                    	</a>
                                    </div>

                                    <div class="ps-product__content">

                                    	<a class="ps-product__title" href="product/${top20Array[i][f].url}">${top20Array[i][f].name}</a>

                                        ${price}

                                    </div>

                                </div>
							`)

						
					}	


				}

				// modificamos el estilo del plugins OWL Carousel
				$(".owl-dots").css({"bottom":"0"});
				$(".owl-dot").css({"background":"#ddd"});



			},topSaleBlock.length*1000)

		

		}


	}


}

