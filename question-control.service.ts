import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { QuestionBase } from '../models/question-base';
import * as _ from 'lodash';


@Injectable()
export class QuestionControlService {

  constructor() { }

  getValidators(q : QuestionBase<any>, v : any){
    let validators = [];
    if (q.hasOwnProperty('required') && q.required ){
      validators.push(Validators.required);
    }
    if (q.hasOwnProperty('validation') && q.validation ) {
      q.validation == "effective_date" ? validators.push(v.effectiveDate) : '';
      q.validation == "birth_date" ? validators.push(v.birth_Date) : '';
      q.validation == "medicare_id" ? validators.push(v.medicareId) : '';
      q.validation == "email" ? validators.push(v.email) : '';
    }
    return [...validators];

  }
  toFormGroup(questionsJSon: any[], validationMethods: any ) {
    let questionGroup: any = {};
    questionsJSon.forEach(question => {
      let fields: any = {};
      question.questionField.forEach(field => {
        fields[field.key] = field.required || field.validation ? new FormControl(field.value || '', [...this.getValidators(field, validationMethods)])
        : new FormControl(field.value || '');
        if (field.hasOwnProperty('subQuestion')  && _.get(field,'subQuestion.question.questionField')  ) {
          let subGroup = {};
          let subGroupName =  field.subQuesFormName;
         _.get(field,'subQuestion.question.questionField').forEach(sq => {
            subGroup[sq.key] = sq.required ? new FormControl('',[...this.getValidators(sq, validationMethods)])
              : new FormControl('');
          });
          fields[subGroupName] = new FormGroup({...subGroup});

        }
      });

        questionGroup[question.key] = new FormGroup(fields);


      });
      

    return new FormGroup(questionGroup);
  }

}
