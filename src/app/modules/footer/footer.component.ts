import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

 path:string = Path.url;
 categories:any[] =[] ;
  render:boolean = true;
 categoriesList:any[] = [];

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {

  	this.categoriesService.getData()
  	.subscribe(resp  => {
	
  		this.categories = Object.values(resp);
  		
  		//Recorrido por el objeto de la data de categorias

  		let i;

  		for (i in this.categories){

  			this.categoriesList.push(this.categories[i].name);

  		}

  	})

  }

//funcion que nos avisa cuando finaliza el renderizado de Angular

  callback(){

  	if(this.render){

  		this.render = false;
  		let arraySubCategories = [];

  		// Separar las categorias 

  		this.categoriesList.forEach(category => {

  			//Tomamos la coleccion de las subcategorias filtranado con los nombre de categoria

  			this.subCategoriesService.getFilterData("category",category)
  			.subscribe(resp => {

  				//Hacemos un  recorrido por la coleccion general de subcategorias y clasificamos de acuerdo a la categoria que correspondan

  				let i;
  				for(i in resp){

  						arraySubCategories.push(
									{
										"category" : resp[i].category,
										"subcategory" : resp[i].name,
										"url" : resp[i].url

									}


								)

  				}


  				//Recorremos el array de objetos nuevos para buscar coincidencias con los nombres de categorias

  				for(i in arraySubCategories){

  					if(category == arraySubCategories[i].category){

  						$(`[category-footer='${category}']`).after(

							`<a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
					    	`

  							)
  					}

  				}




  			})

  		})
  	}


  }

}
