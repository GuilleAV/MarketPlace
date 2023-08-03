import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

	private api:string = Api.url;

    constructor(private http:HttpClient) { }
 
    getData(){

    	return this.http.get(`${this.api}products.json`);
    
    }

    getLimitData(startAt:string,limitToFirst:number){


    		return this.http.get(`${this.api}products.json?orderBy="$key"&limitToFirst=${limitToFirst}&startAt="${startAt}"&print=pretty`);
    }

     getFilterData(orderBy:string,equalTo:string){

    	return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
    
    }

    getFilterDataWithLimit(orderBy:string,equalTo:string, limitToFirst:number){

        return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`);
    
    }

    getSearchData(orderBy:string, param:string) {
     
     return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&startAt="${param}"&endAt="${param}\uf8ff"&print=pretty`);
    }


    patchData(id:string , value:object){

        return this.http.patch(`${this.api}products/${id}.json`,value);
    }

}
