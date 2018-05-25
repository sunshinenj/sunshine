import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Observable} from "rxjs/Observable";
import { MedicareInsurance } from "../../models/medicare-insurance";

@Component({
  selector: 'app-medicare-insurance-inf',
  templateUrl: './medicare-insurance-inf.component.html',
  styleUrls: ['./medicare-insurance-inf.component.css']
})
export class MedicareInsuranceInfComponent implements OnInit {
  medicareInsurnceComponentdata: MedicareInsurance;

  constructor(private qs: QuestionService) {

  }

  ngOnInit() {
    this.medicareInsurnceComponentdata =this.qs.getOleData().medicareInsData;
          
  }

  setFormData(){
    let oledata = this.qs.getOleData();
    let medicareInsFormData = this.qs.getFormData();
    oledata.medicareInsFormData = medicareInsFormData;
    this.qs.setOleData(oledata);
  }

  after2016(){
    this.qs.setMedicareId('after-2016');
    this.medicareInsurnceComponentdata['cardType']='after-2016';
    this.setFormData();
   
  }
  before2016(){
    this.qs.setMedicareId('before-2016');
    this.medicareInsurnceComponentdata['cardType']='before-2016';
    this.setFormData();
    
  }

}
