import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css']
})
export class HomeTopCategoriesComponent implements OnInit {

 	path:string = Path.url;
 	categories:any[] = [];
 	cargando:boolean = false;

	constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {

  	this.cargando = true;

  	//Tomamos los datos de la categoria

  	let getCategories = [];


  	this.categoriesService.getData()
  	.subscribe(resp  => {

  		let i;

  		for(i in resp){

  			getCategories.push(resp[i]);
  		}

  		//ordenamos de mayor a menor las vista de las categorias

		getCategories.sort(function(a,b){

			return(b.view - a.view);
		});

		//filtramos hasta 6 categorias

		getCategories.forEach((category, index)=>{


			if(index <6){

				this.categories[index] = getCategories[index];

			}


		})
		
		this.cargando = false;

  	})
  }

}
