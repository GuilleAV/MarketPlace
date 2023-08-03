import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-breadcrumb',
  templateUrl: './products-breadcrumb.component.html',
  styleUrls: ['./products-breadcrumb.component.css']
})
export class ProductsBreadcrumbComponent implements OnInit {

  breadcrumb:string = null;
  params:string = null;

  constructor(private categoriesService: CategoriesService,
  	           private subCategoriesService: SubCategoriesService,
  	           private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    //Capturamos el parametro URL
  	this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];

  	this.categoriesService.getFilterData("url",this.params)
  	.subscribe(resp1 => {

      if(Object.keys(resp1).length>0){

          let i;

          for(i in resp1){

             this.breadcrumb= resp1[i].name;

             let id = Object.keys(resp1).toString();

             let value = {

                 "view" : Number(resp1[i].view+1)
             }

             this.categoriesService.patchData(id,value)
             .subscribe(resp => {
             });
          }
      }else{

        this.subCategoriesService.getFilterData("url",this.params)
          .subscribe(resp2 => {
            
                let i;

                for(i in resp2){

                   this.breadcrumb= resp2[i].name;
                
                 } 

                 let id = Object.keys(resp2).toString();

                 let value = {

                     "view" : Number(resp2[i].view+1)
                 }

                 this.subCategoriesService.patchData(id,value)
                 .subscribe(resp => {
                 });                 
           })

      }    	

       })

  }

}
