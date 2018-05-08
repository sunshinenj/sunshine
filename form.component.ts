import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {QuestionControlService} from "../../services/question-control.service";
import { QuestionService } from "../../services/question.service";
import * as moment from 'moment';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { ViewService } from "../../services/view.service";
import { ValidationService } from "../../services/validation.service";
import { FormDataService } from "../../services/form-data.service";
import { MedicareInsuranceInfComponent } from "../medicare-insurance-inf/medicare-insurance-inf.component";
import { TooltipService } from "../../services/tooltip.service";
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers : [QuestionControlService]
})
export class FormComponent implements OnInit, OnChanges{
  @ViewChild(MedicareInsuranceInfComponent) ct : MedicareInsuranceInfComponent;
  req : boolean;
  initialForm : {};
  form : FormGroup
  cardType : string;
  currentView : string;
  medicareNum : string;
  viewObj : {};
  subscription : Subscription;
  validationMethods : any;
  selectedValue : any;
  togglevar: boolean = false;
  cancelEnrollmentFlag = false;
  configObj :{};
  firstName : string;
  lastName : string;
  middleName : string;

  constructor(private qs : QuestionService,private qcs :QuestionControlService, private route : ActivatedRoute,
  private vs : ViewService, private router : Router, private validation : ValidationService,private fds : FormDataService, private tooltipService:TooltipService,private configurationService:ConfigurationService) { 
    this.validationMethods = {"medicareId":validation.medicareId.bind(this),"effectiveDate":validation.effectiveDate.bind(this), 
    "birth_Date" :validation.birth_Date.bind(this), "email":validation.emailValidation.bind(this) };

    router.events.subscribe(event => {

      if (event instanceof NavigationEnd && !((event.url.includes('/cancel-enrollment')) || (event.url.includes('/welcome')) || (event.url.includes('/learn-more')) || (event.url.includes('/leavingsite-popup') )) ){
    
        setTimeout(() => {
          this.tooltipService.tooltipmessageservice();
         },300);
        this.currentView = event.url; // event.url has current url
        this.viewObj = this.vs.getViewData(this.currentView);
        this.configObj = this.configurationService.getOleClient();
        this.dynamicValues();
        this.form = this.qcs.toFormGroup(this.viewObj['currentViewObject'],this.validationMethods);
        
        this.initialForm = {...this.form}
        console.log("form befoe is : "+this.form.valid);
        let data = this.fds.getFormData();
        if (data){
          this.form.patchValue(data);
        }
         console.log("form after is : "+this.form.valid);

        
      }

      if (event instanceof NavigationStart && this.form){
        this.fds.setFormData(this.form.value);
      }
    });
 }

 cancelFlag(val,rule){
    this.cancelEnrollmentFlag = val==rule?true:false ;  
 }

  ngOnInit() {

    this.selectedValue ="English";
    this.cardType = this.qs.getOleData().medicareInsData['cardType'];
    this.subscription = this.qs.getQuestionService().subscribe( message => {
        if(message['cardType']){
          this.cardType = message.cardType;
          if(this.cardType.includes('after')){
            this.viewObj['currentViewObject'].forEach(question => {
              let k = question.key;
              question.questionField.forEach(field => {
                  if(field.label.startsWith("Medicare")){
                      let cn = field.key;
                      field.mask = field.mask == '999-99-9999-S'? 'AAAA-AAA-AAAA': field.mask;
                      field.label = field.label.startsWith("Medicare") ? "Medicare Number" : field.label;
                      const val={};
                      const v2 = {};
                      v2[cn] = this.medicareNum? this.medicareNum:'';
                      val[k]=v2;
                      this.medicareNum = this.form.get(field.path).value; 
                      this.form.patchValue({...val});
                  }
                });
              });
          }else if(this.cardType.includes('before')){
            this.viewObj['currentViewObject'].forEach(question => {
              let k = question.key;
              question.questionField.forEach(field => {
                  if(field.label.startsWith("Medicare")){
                    let cn = field.key;
                      field.mask = field.mask == 'AAAA-AAA-AAAA'? '999-99-9999-S': field.mask;
                      field.label = field.label.startsWith("Medicare") ? "Medicare Claim Number" : field.label;
                      const val={};
                      const v2 = {};
                      v2[cn] = this.medicareNum? this.medicareNum:'';
                      val[k]=v2;
                      this.medicareNum = this.form.get(field.path).value; 
                      this.form.patchValue({...val});
                  }
                });
              });
          }
          
        }
     });
      this.configObj = this.configurationService.getOleClient();
  }
  dynamicValues(){
    this.viewObj['currentViewObject'].forEach(question => {
      let k = question.key;
      let medicareView = this.fds.getFormDataForURL("/steps/medicare-information");
      question.questionField.forEach(field => {
        if(field.dynamic){
            Object.keys(medicareView).forEach((key) => {
               Object.keys(medicareView[key]).forEach(k => {
                 if(field.key == k){
                    field.value = medicareView[key][k];
                 }
               });  
            });
             Object.keys(this.configObj).forEach((key) => {
               if((key.toLowerCase()).includes((field.key).toLowerCase())){
                  field.value= this.configObj[key];
               }
               
             });   
        }
      });
    });

  }
  noneChecked(path : string, na : string){
    if(!na){
        let cv = this.vs.getViewData(this.currentView).currentViewObject;
        cv.forEach((key) => {
            key.questionField.forEach(k => {
              Object.keys(k).forEach(l => {
                if(k['noneapplies']){
                   this.form.get(k['path']).setValue(false);  
                }
              });   
            });  
        });
      return
    }else if(this.form.get(path).value === true){
        return;
    }else{
      this.form.patchValue({...this.initialForm});
      this.form.get(path).setValue(true);
    }   
  }

  ngOnChanges(){
    

  }
  
  toggleUL() {
    this.togglevar = !this.togglevar;
  }

  next(){
    let nxtUrl = !(this.viewObj['nextView'].includes('review'))?'/steps/'+this.viewObj['nextView']:this.viewObj['nextView'];
    this.router.navigate([nxtUrl]);
  }

  back(){
    this.vs.setMaxProgress(this.viewObj['percentCompleted']);
    let backUrl = !(this.viewObj['previousView'].includes('welcome'))?'/steps/'+this.viewObj['previousView']:this.viewObj['previousView'];
    this.router.navigate([backUrl]);
  }

}
