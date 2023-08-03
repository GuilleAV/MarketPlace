import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.css']
})
export class ProductBreadcrumbComponent implements OnInit {

  	breadcrumb:string = null;

  	constructor(private activatedRoute: ActivatedRoute,
  		        private productsService: ProductsService) { }

 	 ngOnInit(): void {

 	 	 //Capturamos el parametro URL
  		this.breadcrumb = this.activatedRoute.snapshot.params["param"].replace(/[_]/g," ");


  		//Actualizar vistas de productos
  		this.productsService.getFilterData("url",this.activatedRoute.snapshot.params["param"])
  		.subscribe(resp => {

			for(const i in resp){

	            let id = Object.keys(resp).toString();

	            let value = {

	                 "views" : Number(resp[i].views+1)
	            }

	             this.productsService.patchData(id,value)
	             .subscribe(resp => {
	             });
	        }

 	 	})

     }
}
