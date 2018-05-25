import { Component, OnInit } from '@angular/core';
import { oledataAem } from '../../models/ole-complete-data';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TooltipService } from "../../services/tooltip.service";
import { QuestionService } from '../../services/question.service';
import { pcpPageDataToOle } from '../../models/pcp_data';
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: 'app-ole-primary-care-provider',
  templateUrl: './ole-primary-care-provider.component.html',
  styleUrls: ['./ole-primary-care-provider.component.css']
})
export class OlePrimaryCareProviderComponent implements OnInit {
  //pcpComponentdata: oledataAem;
  subscription :Subscription;
  pcpComponentdata: pcpPageDataToOle;
  tooltipcontent:any;
  constructor(private QuestnService: QuestionService, private tooltipService:TooltipService) {

  }



  ngOnInit() {
   this.tooltipService.tooltipmessageservice();
   this.subscription = this.QuestnService.getQuestionService().subscribe(
    message => {
      this.pcpComponentdata = this.QuestnService.getOleData().pcpPageData;
    });
   this.pcpComponentdata = this.QuestnService.getOleData().pcpPageData;
   }

}
