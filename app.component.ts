import {Component, OnInit} from '@angular/core';
import { QuestionService } from './services/question.service';
import { ViewService } from './services/view.service';
import {HttpClient} from "@angular/common/http";
import { forkJoin } from "rxjs/observable/forkJoin";
import {LocalStorageService} from 'ngx-webstorage';
import {Router, ActivatedRoute} from "@angular/router";
import {FormDataService} from './services/form-data.service';
import {ConfigurationService} from './services/configuration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:  [QuestionService,ViewService,FormDataService], 
})


export class AppComponent implements OnInit{
  questions: any[];
  oleCmsCodeData: any;
  constructor(private service: QuestionService, private http: HttpClient, private storage:LocalStorageService, 
    private router : Router, private route: ActivatedRoute, private configurationService : ConfigurationService) {
    // this.questions = service.getQuestions();
    
    if(!this.storage.retrieve('oleData')){
    
    service.fetchData().subscribe(
      (questions ) => {
       // this.questions = service.getQuestions();
        console.log("med ins dataquestions");
        service.formatData(questions);
      },
      (error) => console.log(error)
    )
    
    }

  }
  onActivate() {
    window.scroll(0,0);
  }

  
  back() {
      this.router.navigate(['../'],{ relativeTo: this.route });
    }
      
  ngOnInit() {
    setTimeout(() => {
      this.oleCmsCodeData = this.service.getOleData().olecmscode;
     },1000);
    

  }
}
