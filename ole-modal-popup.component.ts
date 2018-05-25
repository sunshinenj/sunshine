import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { PopupService } from "../../services/popup.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import {oledataAem} from "../../models/ole-complete-data";
import {OleCompleteDataService} from "../../services/ole-complete-data.service";
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-ole-modal-popup',
  templateUrl: './ole-modal-popup.component.html',
  styleUrls: ['./ole-modal-popup.component.css']
})
export class OleModalPopupComponent implements OnInit, OnDestroy {
  id: string;
  displayPopup: boolean;
  subscription: Subscription;
  modalPopupCompntdata: any;
  constructor(private questionService: QuestionService,  private OleCompleteDataService:OleCompleteDataService, private popupService: PopupService, private route: ActivatedRoute, private router: Router) {
    this.subscription = this.popupService.getPopup().subscribe(message => { this.displayPopup = message.openPopup; });

  }


  closepopup() {
    this.displayPopup  = false;
  }

  back(){
    this.router.navigate(['../'],{ relativeTo: this.route });
  }

  leavingSiteRedirectTo() {
      location.href ="/";
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
    });
   this.modalPopupCompntdata  = this.questionService.getOleData().modalPopupData;
   this.displayPopup = true;
   
  }
  ngOnDestroy() {
        this.subscription.unsubscribe();
  }
}
