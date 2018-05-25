import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';


@Injectable()
export class FormDataService {
  formData : any;
  constructor(private storage:LocalStorageService, private router: Router) { }

  setFormData(data : Array<any>){
    let view =this.router.url;
    this.formData = this.storage.retrieve('formData');
    let keyLables=this.getQuestionFieldLabelsForView(view);
    if(this.formData && this.formData.length>0 ){
      let flag=  false;
      this.formData.forEach((arr,index)=>{
        
        if(arr.view ==view){
          this.formData[index]={view,data,keyLables};
          flag= true;
        }
       });
       if(!flag){
          this.formData.push({view,data,keyLables});  
       }
    }else{
      
      this.formData = [];
      this.formData.push({view,data,keyLables});
    }
    this.storage.store('formData',this.formData);
  }
  getFormData(){
    let v = this.router.url;
    this.formData = this.storage.retrieve('formData');
    let data ;
    if(this.formData){
      this.formData.forEach((arr,index)=>{
        if(arr.view ==v){
          data = arr['data'];
        }
      });
    }
    return data;
  }

 getFormDataForURL(url : String){
 
  let v = url;
  this.formData = this.storage.retrieve('formData');
  let data ;
  if(this.formData){
    this.formData.forEach((arr,index)=>{
      if(arr.view ==v){
        data = arr['data'];
      }
    });
  }
  return data;
}



  getQuestionFieldLabelsForView(view : String){
    
    let commonQuestions = this.storage.retrieve('oledata').commonQuestions;

    for(let i=0;i<commonQuestions.length;i++){

      let questionObject = commonQuestions[i];

      if(view == "/steps/"+questionObject.viewName){
        return this.getLabels(view, questionObject.currentViewObject);

      }
    }
  }

  getLabels(view : any, currentViewObject : any){

    let keyLables=[];

    for(let i=0;i<currentViewObject.length;i++){

      let question =  currentViewObject[i];

      let key = question.key;
      let value = question.ques;

      keyLables.push({key,value});

      for(let k=0;k<question.questionField.length;k++){

          let field = question.questionField[k];
          
          let key = field.key;
          let value = field.label;
          keyLables.push({key,value});

      }

  }
  console.log("Questions with Field lables for current view "+ view 
  + " \n " + JSON.stringify(keyLables));
  return keyLables;
 }
}


