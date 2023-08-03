import { Component, OnInit, Input } from '@angular/core';
import { Path } from '../../../../config';
import { Rating, DinamicRating, DinamicReviews } from '../../../../function';

declare var JQuery:any;
declare var $:any;

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

	@Input() childItem:any;

	path:string = Path.url;
	rating:any[] = [];
	reviews:any[] = [];
	totalReviews:string;
	itemReviews:any[] = [];
	render:boolean = true;



	constructor() { }

	ngOnInit(): void {

		//Rating

		this.rating.push(DinamicRating.fnc(this.childItem));

		//Reviews

		let reviews = [];

		reviews.push(DinamicReviews.fnc(this.rating[0]));

		for(let i = 0; i < 5 ;i++){

			$(".reviewsOption").append(`

				<option value="${reviews[0][i]}">${i+1}</option>

				`)
		}

		Rating.fnc();

		// Total Reviews 

		this.totalReviews = JSON.parse(this.childItem["reviews"]).length;

			// Stars Block
			// Necesitamos un array vacio para almacenar los review

			let arrayReview = [];

			JSON.parse(this.childItem["reviews"]).forEach(rev => {

				arrayReview.push(rev.review);
			})

			//Ordenamos el array de mayor a menor
			arrayReview.sort();

			let objectStar = {

				"1":0,
				"2":0,
				"3":0,
				"4":0,
				"5":0

			}

			//Identificamos que valores se repiten y cuales no se repiten

			arrayReview.forEach((value, index, arr)=>{

				//Tomamos del array completo el primer indice de cada valor
				let first_index = arr.indexOf(value);
				//Tomamos del array completo el ultimo indice de cada valor
				let last_index = arr.lastIndexOf(value);


				//Comparamos si tanto el primer indice como el ultimo indice del mismo valor son diferentes, si es diferente significa que se repite varias veces, si son iguales significa que nunca se repite
				if(first_index !== last_index){

					//Incrementamos valores repetidos en las propiedades del objeto star
					objectStar[value] += 1;

				}else{
					//Incrementamos valores que no se repiten en las propiedades del objeto star
					objectStar[value] += 1;
				}

			})

			// Hacemos un recorrido por cada uno de los renglones de estrellas
			for(let i = 5; i > 0; i--){
				//Hacemos una regla de 3: la cantidad que suma cada estrella multiplicado por 100 dividido por la cantidad de calificaciones
				let starPercentaje = Math.round((objectStar[i] * 100) / arrayReview.length );

				$(".ps-block--average-rating").append(`

					 <div class="ps-block__star">

		            	<span>${i} Star</span>

		                <div class="ps-progress" data-value="${starPercentaje}">

		                	<span></span>

		                </div>

		                <span>${starPercentaje}%</span>

		            </div>


					`)
			}
			// Enviamos a la vista las reseñas del producto

			this.itemReviews.push(JSON.parse(this.childItem["reviews"]));

		}

		callback(){

			if(this.render){

				this.render = false;

				let reviews = $("[reviews]") ;

				for(let i = 0; i < reviews.length ;i++){


					for(let r = 0; r < 5 ;r++){

						$(reviews[i]).append(`

							<option value="2">${r+1}</option>

							`)

						if($(reviews[i]).attr("reviews") == (r+1)){

							$(reviews[i]).children("option").val(1)
						}
					}

				}

				Rating.fnc();


			}
		}


	}
