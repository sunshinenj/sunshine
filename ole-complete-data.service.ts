
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class OleCompleteDataService {

  constructor(private http:HttpClient ) {




   }
   

  public getJson():Observable<any>{

  return this.http.get("/assets/olecompletedata.json");

  }

  public getJsonModal():Observable<any>{

  return this.http.get("/assets/olemodelcontent.json");

  }
}
