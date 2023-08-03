import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-breadcrumb',
  templateUrl: './search-breadcrumb.component.html',
  styleUrls: ['./search-breadcrumb.component.css']
})
export class SearchBreadcrumbComponent implements OnInit {

	 breadcrumb:string = null;

  	constructor(private activatedRoute: ActivatedRoute) { }

 	 ngOnInit(): void {

 	 	 //Capturamos el parametro URL
  		this.breadcrumb = this.activatedRoute.snapshot.params["param"].replace(/[_]/g," ");
 	 }

}
