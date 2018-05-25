import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {QuestionService} from './question.service';

@Injectable()
export class ViewService {

  constructor(private storage:LocalStorageService,private qs:QuestionService) { }
  maxProgress : number = 0;

  setMaxProgress(progress : number){
    this.maxProgress = progress> this.maxProgress ? progress : this.maxProgress;
  }


  getViewData(view:string){
    view = view.startsWith('/steps/')?view.replace('/steps/',''): view;
    let data = this.storage.retrieve('oleData');
    let commonQues = data.commonQuestions;
    let viewData:any;
    for (const k of commonQues) {
      if (view === k.viewName) {
        k.percentCompleted = this.maxProgress > k.percentCompleted ? this.maxProgress : k.percentCompleted;
        viewData = {...k}
        viewData['errorMessages']= data.oleErrorMsgs;
      }
    }
    return {...viewData};
  }
  
}
