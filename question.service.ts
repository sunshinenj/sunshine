import { Injectable }       from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {forEach} from '@angular/router/src/utils/collection';
import {QuestionBase} from '../models/question-base';
import {RadioQuestion} from '../models/question-radio';
import {DropdownQuestion} from '../models/question-dropdown';
import {CheckboxQuestion} from '../models/question-checkbox';
import {TextboxQuestion} from '../models/question-textbox';
import {Formgroup} from '../models/formgroup';
import * as _ from 'lodash';
import { oleConstants } from "../constants/constants";
import { MedicareInsurance } from "../models/medicare-insurance";
import { OleData } from "../models/ole-data";
import { Observable } from 'rxjs/Observable';
import { ModelPopupModel } from '../models/model-popup';
import { WelcomeToOLE } from '../models/welcome';
import { SubmissionConfirmationModel } from '../models/submission-confirmation';
import { pcpPageDataToOle } from '../models/pcp_data';
import {Subject} from 'rxjs/Subject';
import { OLEReviewDocument } from '../models/review-document';
import {LocalStorageService} from 'ngx-webstorage';
import { ConfigurationData } from '../models/configuration-data';
import { ConfigurationService } from './configuration.service';
import { RightRail } from '../models/rightrail';
import { TextAreaQuestion } from '../models/question-textarea';


@Injectable()
export class QuestionService {
  enableButton = false;
  cardType:string;
  private subject = new Subject<any>();
  medicareInsData:MedicareInsurance;
  questionJSon : Array<any>;
  reviewDocumentData : OLEReviewDocument;
  commonQuesMap =[];
  formData : any;
  configurationData : ConfigurationData;
  constructor(private httpClient: HttpClient, private oleData: OleData,private storage:LocalStorageService,private configurationService:ConfigurationService){ }
  questions: QuestionBase<any>[] = [];
  getQuestionService(): Observable<any> {
        return this.subject.asObservable();
  }
  setMedicareId(type : string){
    this.cardType = type;
    this.subject.next({cardType:this.cardType});
  }
  setFormData(data:any){
    this.formData = data;
  }
  getFormData(){
    return this.formData;
  }
  convertToControls(inputQuestions): QuestionBase<any>[] {
    let questions: QuestionBase<any>[] = [];
    inputQuestions.forEach((ques, index) => {
          

      switch(ques.controlType) {
        case "radiobutton": {
          questions.push(new RadioQuestion(ques));
          break;
        }
        case "dropdown": {
          questions.push(new DropdownQuestion(ques));
          break;
        }
        case "checkbox": {
          questions.push(new CheckboxQuestion(ques));
          break;
        }
        case "textField": {
          questions.push(new TextboxQuestion(ques));
          break;
        }
        case "textArea": {
          questions.push(new TextAreaQuestion(ques));
          break;
        }
        case "formgroup": {
          questions.push(new Formgroup(ques));
          break;
        }

      }
    });
    return questions.sort((a, b) => a.order - b.order);


  }


  fetchQuestions() {
    const url = 'assets/data.json';
    return this.httpClient.get(url);
  }
  fetchTooltips() {
    const url = 'assets/data.json';
    return this.httpClient.get(url);
  }
  fetchformViews() {
    const url = 'assets/data.json';
    return this.httpClient.get(url);
  }
  fetchData() {
    const url = 'assets/'+this.configurationService.getOleClient().siteId+'/rawJson.json';
    return this.httpClient.get(url);
  }

  formatData(rawJson:any) {
    let miObj = _.get(rawJson,oleConstants.ole_medicareInsurance_path);
    this.medicareInsData = new MedicareInsurance(_.get(rawJson,oleConstants.ole_medicareInsurance_path));
    this.oleData.setModalPopupData(new ModelPopupModel( _.get(rawJson, oleConstants.ole_modalPopup_path)));
    this.oleData.setSubmisssionConfirmationData(new SubmissionConfirmationModel( _.get(rawJson, oleConstants.ole_submissionconfirmation_path)));
    this.oleData.setWelcomeToOLE(new WelcomeToOLE( _.get(rawJson, oleConstants.ole_welcome_path)));
    this.oleData.setPcpPageData(new pcpPageDataToOle(_.get(rawJson, oleConstants.ole_pcp_path)));
    this.oleData.setReviewDocumentData(new OLEReviewDocument(_.get(rawJson, oleConstants.ole_review_document_path)));
    this.oleData.setWelcomeToOLE(new WelcomeToOLE( _.get(rawJson, oleConstants.ole_welcome_path)));
    this.oleData.setRightRailData(new RightRail( _.get(rawJson, oleConstants.ole_rightrail_path)));
    this.oleData.setolecmscode( _.get(rawJson, oleConstants.ole_olecmscode_path));
    //alert(JSON.stringify(rawJson));
         let errMsgsObj = _.get(rawJson, oleConstants.ole_error_msgs);
         let errMsgArr =[];
         for (const k of errMsgsObj){
          const c = JSON.parse(k);
          errMsgArr.push(c);
          }
    let formattedErrMsgObj= _.mapValues(_.keyBy(errMsgArr, "key"), 'errmsg');
    this.oleData.setErrorMsgs(formattedErrMsgObj);
    let medicareInsques = _.get(rawJson,'medicareInsuranceInformation.jcr:content.oleParsys.medicareinsuranceinf.map');
    let commonQues =_.get(rawJson,'questionlayout.jcr:content.oleParsys.questionsview.view');
    let oleMasterListQuestion = this.oleData.setMasterListQuestions(_.get(rawJson,'masterlistquestions.jcr:content.oleParsys'));
    const medicareInsquesmap =_.map(JSON.parse(medicareInsques), function(value) {return value;});
    let commonQuesJson = JSON.parse(JSON.stringify(commonQues));


    for(let x=0;x<commonQuesJson.length;x++){

      if(commonQuesJson[x]){

        let map = JSON.parse(commonQuesJson[x]).map;
        let viewName = JSON.parse(commonQuesJson[x]).name;
        let title =JSON.parse(commonQuesJson[x]).title;
        let stateandplanMap = JSON.parse(commonQuesJson[x]).smap;
        let checked = JSON.parse(commonQuesJson[x]).exclcheck;
        let currentViewObject:any;

        let flag = true ;

        if(stateandplanMap.length >0){
          if(checked){
            checked = checked[0];
          }
          flag =this.filterQuestionData(stateandplanMap,checked);
        }
     
        

        let key ="";
        let maparr =[];
        for(const m of map){
           key =((m.replace(/{/g, '')).replace(/}/g,'')).replace(/"/g,'');
          key= key.split(":")[1];
          maparr.push(key)  ; 
        }  

       currentViewObject = this.setMasterListData(maparr,this.oleData.masterListQuestions);
       /* for radio buttons, check fields attribute required and mark the question is required */
       let questionArray=[];
       for(let x=0;x<currentViewObject.length;x++){

        let question = currentViewObject[x];

          if(question.questionField){
            let questionFieldArray=[];

            for(let y=0;y<question.questionField.length;y++){
              let questionField = question.questionField[y];
              if(questionField.controlType == 'radiobutton' && questionField.required == true){
                question.required = true;
              }
              questionFieldArray.push(questionField);
            }

            
            question.questionField = [...questionFieldArray];
          }
          questionArray.push({...question});
        }
        
        currentViewObject = questionArray;
       
       if(flag){
       this.commonQuesMap.push({title,viewName,maparr,currentViewObject});
       }
      } else{
        console.log(" commonQuesJson["+x+"] value is " + commonQuesJson[x]);

      }
      

    }

    let totalSteps = this.commonQuesMap.length;
    let eachStepPercent = 0;
    let nextView = "";
    let previousView = "/welcome";

    if(totalSteps != 0){
      eachStepPercent	= 100/totalSteps;
    }
    
    
    /*view information with progress information logic*/
    let percentCompleted = 0;
    let commonQuesMapTemp = [];
    for(let i=0;i<this.commonQuesMap.length;i++){

      let temp = this.commonQuesMap[i];
      if(i+1 < this.commonQuesMap.length) {
        nextView = this.commonQuesMap[i+1].viewName;
       }else if(i == this.commonQuesMap.length-1){
        nextView = "/review";
       }
  
      if(i>0){
        previousView = this.commonQuesMap[i-1].viewName;
      }

      temp.nextView = nextView;
      temp.previousView = previousView;
      temp.percentCompleted = percentCompleted;
      commonQuesMapTemp[i] = temp;
      percentCompleted = Math.round((percentCompleted + eachStepPercent)/5)*5;
    }
    this.commonQuesMap = commonQuesMapTemp;
    
   this.oleData.setCommonQuestions(this.commonQuesMap);

   this.oleData.setMedicareInsData(this.medicareInsData);
   this.subject.next({dataReady:true});
   this.storage.store('oleData', this.oleData);
  }

  //filter object data based on state and plantype
  filterQuestionData(stateandplan,checked){
    let oleclient = this.configurationService.getOleClient();
    if(oleclient.siteId =='uhc' && (oleclient.PlanType=='SNP'||oleclient.PlanType=='DSNP')){
      oleclient.PlanType = "MR-"+oleclient.PlanType;
    }
    let flag = false;
    for (const c of stateandplan) {
      let map = JSON.parse(c);
      if ((map.state == oleclient.StateCode && map.planType == oleclient.PlanType)||(map.state == oleclient.StateCode && map.planType=='')||(map.state =='' && map.planType == oleclient.PlanType)){
        flag = true;
        if (checked == "true" || checked == true) {
          flag = false;
          return flag;
        }
      }
      if ((map.state != oleclient.StateCode || map.planType != oleclient.PlanType) && (checked == "true" || checked == true)) {
        flag = true;
      }
    }
    return flag;

  }

  

  setMasterListData(questionmap,masterlistQuestions){
    let masterlistArray =[];
    this.questionJSon =[];
    Object.keys(masterlistQuestions).forEach(key => {
      masterlistArray.push(masterlistQuestions[key]);
     });
     
     let groupKey;
     for (const k of questionmap) {
      for (const arr of masterlistArray) {
        let fieldsJson= [];
        if (k === arr.key) {
          let includeQuestionFlag = true;
          Object.keys(arr).forEach(key => {
            if (arr.smap) {
              if (typeof (arr.smap) == "object") {
                includeQuestionFlag = this.filterQuestionData(arr.smap, arr.exclcheck);
              }
              else {
                includeQuestionFlag = this.filterQuestionData(JSON.parse(arr.smap), arr.exclcheck);
              }
            }
            if ((key.startsWith("jcr")) || (key.startsWith("sling"))) {
              delete arr[key];
            }
            if(key == 'key'){
                groupKey = arr.key+".";
            }
            if(key.startsWith("questionField")){
              let val = arr[key];
              Object.keys(val).forEach(key => {
                let includeFieldFlag = true;
                if (key.startsWith("questionfield")) {
                  let exclcheck = val[key].exclcheck;
                  if (val[key].smap) {
                    if (typeof (val[key].smap) == "object") {
                      includeFieldFlag = this.filterQuestionData(val[key].smap, exclcheck);
                    }
                    else {
                      includeFieldFlag = this.filterQuestionData(JSON.parse(val[key].smap), exclcheck);
                    }
                  }
                  if (includeFieldFlag) {
                    fieldsJson.push(val[key]);
                  }
                }
              }); 
              
              for(const i of fieldsJson){
                let subgroupPath: string;
                Object.keys(i).forEach(key => {
                  if(key == 'key'){
                    i['path'] = groupKey+i.key;
                    subgroupPath = groupKey+i.key+'-sub';
                  }
                  if((key.startsWith("jcr"))||(key.startsWith("sling"))){
                    delete i[key] ;
                  }
                  if((key.startsWith("txtlabel"))){
                    i['label'] = i.txtlabel;
                    delete i[key] ;
                  }
                  if(key == 'sub'){
                    const val = i[key];
                    Object.keys(val).forEach(key => {
                      if((key.startsWith("jcr"))||(key.startsWith("sling"))){
                        delete val[key] ;
                      }
                      if(key=='question'){
                        
                        const innerval = val[key];
                        Object.keys(innerval).forEach(key => {
                          if((key.startsWith("jcr"))||(key.startsWith("sling"))){
                            delete innerval[key] ;
                          }
                          if(key.startsWith("questionField")){
                            let fieldsJson =[];
                            let val = innerval[key];
                            Object.keys(val).forEach(key => {
                              let includeFieldFlag = true;
                              if (key.startsWith("questionfield")) {
                                let exclcheck = val[key].exclcheck;
                                if (val[key].smap) {
                                  if (typeof (val[key].smap) == "object") {
                                    includeFieldFlag = this.filterQuestionData(val[key].smap, exclcheck);
                                  }
                                  else {
                                    includeFieldFlag = this.filterQuestionData(JSON.parse(val[key].smap), exclcheck);
                                  }
                                }
                                if (includeFieldFlag) {
                                  fieldsJson.push(val[key]);
                                }
                              }
                            });
                            for(const i of fieldsJson){
                              Object.keys(i).forEach(key => {
                                if(key == 'key'){
                                  i['path'] = subgroupPath+'.'+i.key;
                                }
                                if((key.startsWith("jcr"))||(key.startsWith("sling"))){
                                  delete i[key] ;
                                }
                                if((key.startsWith("txtlabel"))){
                                  i['label'] = i.txtlabel;
                                  delete i[key] ;
                                }
                              });
                            } 
                            innerval[key] = this.convertToControls([...fieldsJson]);
              
                          }
                        });
                      }
                    });
                  } 
                  
                });
              }
              
              arr[key] = this.convertToControls([...fieldsJson]);
            }
          });
          if (includeQuestionFlag) {
            this.questionJSon.push(arr);
          }
        }
      }
    }
 return  this.questionJSon;
  }

  getOleData(){
    if(this.storage.retrieve('oleData')){
      return this.storage.retrieve('oleData');
    }
    else{
    return this.oleData;
    }
  } 
  setOleData(oledata){
    this.storage.store('oleData', oledata);
  }

}
