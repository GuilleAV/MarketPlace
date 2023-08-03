import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { Search } from '../../function';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	path:string = Path.url;
	categories:any[] =[] ;
	arrayTitleList:any[] = [];
	render:boolean = true;

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {

  	//Tomamos los datos de la categoria


  	this.categoriesService.getData()
  	.subscribe(resp  => {
	
  		this.categories = Object.values(resp);

  		//Recorremos la coleccion de categorias para tomar la lista de titulos

  		this.categories.forEach(c => 

  			this.arrayTitleList.push(JSON.parse(c.title_list))

  			);



   		 })
  }

  // Funcion del buscador
 goSearch(search:string){

 	if(search.length == 0 || Search.fnc(search) == undefined){

 		return;
 	}

 	window.open(`search/${Search.fnc(search)}`,'_top')


 }


  // Funcion que nos avisa cuando finaliza el renderizado del ngFor

callback(){

	if(this.render){

		this.render=false;
		let arraySubCategories = [];

		//Hacemos un recorrido por la lista de titulos

		this.arrayTitleList.forEach(titleList => {

			//separar individualmente los titulos

			//console.log("titleList",titleList);

		

			for (let i = 0; i < titleList.length; i++) {
				
		
			//	console.log("titleList",titleList[i]);


				//Tomamos la coleccion de las sub-categorias filtrando con la lista de titulos

				this.subCategoriesService.getFilterData("title_list",titleList[i])
				.subscribe(resp =>{

					arraySubCategories.push(resp);


					//Hacemos un recorrido por la coleccion general de subcategorias


					let f;
					let g;
					let arrayTitleName =  [];

					for(f in arraySubCategories){

					//Hacemos un recorrido por la coleccion particular de subcategorias

						for(g in arraySubCategories[f]){

							//Creamos un nuevo array de objetos clasificando cada subcategoria con la respectiva lista de titulos

							arrayTitleName.push(
									{
										"titleList" : arraySubCategories[f][g].title_list,
										"subcategory" : arraySubCategories[f][g].name,
										"url" : arraySubCategories[f][g].url

									}


								)



						}

					}
					
					// Recorremos el array de objetos nuevos para buscar coincidencias con la lista de titulo

					for(f in arrayTitleName){

						if(titleList[i]== arrayTitleName[f].titleList){

							//Imprimir el nombre de subcategoria debajo del listado correspondiente

						$(`[titleList='${titleList[i]}']`).append(
								`<li>
									<a href="products/${ arrayTitleName[f].url}">${ arrayTitleName[f].subcategory}</a>
								</li>`
							)
						}
					}

				})

			}

		})

	}


}	

}
