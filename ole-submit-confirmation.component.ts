import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import  { oledataAem } from "../../models/ole-complete-data";
import { QuestionService } from '../../services/question.service';
import { Subscription } from "rxjs/Subscription";
import { SubmissionConfirmationModel } from '../../models/submission-confirmation';

@Component({
  selector: 'app-ole-submit-confirmation',
  templateUrl: './ole-submit-confirmation.component.html',
  styleUrls: ['./ole-submit-confirmation.component.css']
})
export class OleSubmitConfirmationComponent implements OnInit {

  submissionConfirmationComponentdata: SubmissionConfirmationModel;
  subscription :Subscription;
  constructor(private questionService: QuestionService) {

  }
print(): void {


    let printContents, printWin;
    printContents = document.getElementById('ole-common-form').innerHTML;
   printWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    printWin.document.open();
    printWin.document.write(`
      <html>
        <head>
          <title>Submission Confirmation</title>
          <style>
          svg{display:none;}
          .hide-for-print{display:none;}
          </style>
        </head>
    <body onload="window.print();">${printContents}</body>
      </html>`
    );
    printWin.document.close();

}

  ngOnInit() {

      this.subscription = this.questionService.getQuestionService().subscribe(
        message => {
          this.submissionConfirmationComponentdata = this.questionService.getOleData().submisssionConfirmationData;
        });
      this.submissionConfirmationComponentdata = this.questionService.getOleData().submisssionConfirmationData;
  }
}
