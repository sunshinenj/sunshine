import { Component, OnInit, OnDestroy } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { oledataAem } from '../../models/ole-complete-data';
import { PopupService } from '../../services/popup.service';
import {TooltipService} from "../../services/tooltip.service";
import {OleCompleteDataService} from "../../services/ole-complete-data.service";
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service'
import { WelcomeToOLE } from '../../models/welcome';
import { Subscription } from "rxjs/Subscription";
import { NgForm } from "@angular/forms/src/forms";
import { ConfigurationService } from '../../services/configuration.service';
import { CurrencyPipe } from '@angular/common';

declare var myFn: any;

@Component({
  selector: 'app-welcome-ole',
  templateUrl: './welcome-ole.component.html'
})
export class WelcomeOleComponent implements OnInit, OnDestroy  {
  private introForm: string;
  welcomeAgreeFlag : boolean = false;
  subscription: Subscription;
  configObj :{};

  welcomeComponentdata: WelcomeToOLE;

  private enrollmemtmodalpopup: boolean = false;
  constructor ( private storageService: SessionStorageService, private popupService: PopupService, 
    private tooltipService:TooltipService, private OleCompleteDataService:OleCompleteDataService, 
    private questionService:QuestionService, private configurationService:ConfigurationService) {
  }

  ngOnInit() {
    this.subscription = this.questionService.getQuestionService().subscribe(
      message => {
        this.welcomeComponentdata = this.questionService.getOleData().welcomeToOLEData;
      }
    );
    this.welcomeComponentdata = this.questionService.getOleData().welcomeToOLEData;
    this.configObj = this.configurationService.getOleClient();
    this.welcomeAgreeFlag = this.welcomeComponentdata && this.welcomeComponentdata['agreeCheck']? this.welcomeComponentdata.agreeCheck : false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  submit(form: NgForm){
    console.log(form);
  }

  welcomeNextBtn(){
    let oleCompletedata = this.questionService.getOleData();
    oleCompletedata.welcomeToOLEData['agreeCheck'] = this.welcomeAgreeFlag;
    this.questionService.setOleData(oleCompletedata);
  }



}
