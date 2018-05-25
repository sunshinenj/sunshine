import { Component, OnInit, OnDestroy } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { oledataAem } from '../../models/ole-complete-data';
import { PopupService } from '../../services/popup.service';
import {TooltipService} from "../../services/tooltip.service";
import {OleCompleteDataService} from "../../services/ole-complete-data.service";
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service'
import { WelcomeToOLE } from '../../models/welcome';
import { Subscription } from "rxjs/Subscription";
import { NgForm } from "@angular/forms/src/forms";
import { ConfigurationService } from '../../services/configuration.service';
import { RightRail } from '../../models/rightrail';

@Component({
  selector: 'app-rightrail',
  templateUrl: './rightrail.component.html'
})
export class RightRailComponent implements OnInit {

  rightRailData : RightRail;
  subscription: Subscription;  
  configObj :{};

   constructor ( private storageService: SessionStorageService, private popupService: PopupService, 
    private tooltipService:TooltipService, private OleCompleteDataService:OleCompleteDataService, 
    private questionService:QuestionService, private configurationService:ConfigurationService,
    private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.rightRailData = this.questionService.getOleData().rightRailData;

       this.subscription = this.questionService.getQuestionService().subscribe(
      message => {
        this.rightRailData = this.questionService.getOleData().rightRailData;
      }
    );

    this.configObj = this.configurationService.getOleClient();
  }
  learnMore(){
     this.router.navigate([this.router.url+'/learn-more']);
  }

  leavingOleSite() {
   
    let view = this.route.url;

    this.router.navigate([this.router.url+'/leavingsite-popup']);
    
    }
}
