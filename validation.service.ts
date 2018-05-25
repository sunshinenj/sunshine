import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class ValidationService {
  constructor() { }

  medicareId(control: FormControl): {[s: string]: boolean} {
    let medicare_REGEXP = /^([0-9]{9}([A-Za-z]{1}[0-9A-Za-z]{0,2})|[A-Za-z]{1,3}([0-9]{6}|[0-9]{9})|[A-Za-z]{1}([0-9]{10})|([1-9]{1}([AC-HJ-KM-NP-RT-Yac-hj-km-np-rt-y]){1}([AC-HJ-KM-NP-RT-Yac-hj-km-np-rt-y0-9]){1}[0-9]{1}([AC-HJ-KM-NP-RT-Yac-hj-km-np-rt-y]){1}([AC-HJ-KM-NP-RT-Yac-hj-km-np-rt-y0-9]){1}[0-9]{1}([AC-HJ-KM-NP-RT-Yac-hj-km-np-rt-y]){2}[0-9]{2}))$/gi;
    let patternMatch = medicare_REGEXP.test(control.value);
    return patternMatch ? null : {'invalidMedicare': true};
  }
 
  effectiveDate(control: FormControl): {[s: string]:boolean} {
    if(!moment(control.value.substring(0, 2)+'-'+control.value.substring(2, 4)+'-'+control.value.substring(4), "MM-DD-YYYY",true).isValid()){
        return {'invalidDateFormat':true};  
      }
    let medicareStartDate = new Date("1966/07/01");
    let presentDate = new Date(Date.now());
    presentDate.setDate(presentDate.getDate() + 90);
    presentDate.setMonth(presentDate.getMonth() + 3);
    let inputDate = medicareStartDate;
    if (control && control.value && control.value.length == 8){
      inputDate = new Date(control.value.substring(0, 2)+'/'+control.value.substring(2, 4)+'/'+control.value.substring(4));
    }
    if (control && control.value && control.value.length <8){
      return {'invalidDateFormat':true};
    }else if (control && control.value && control.value.length == 8 && inputDate.getTime() < medicareStartDate.getTime()) {
      return {'invalidStartDate':true};
    } else {
        if (control && control.value && control.value.length == 8 && inputDate.getTime() >= presentDate.getTime()) {
          return {'invalidDate':true};
        } else
        return null;   
    }
  }

  birth_Date(control: FormControl): {[s: string]:boolean} {
    let a = moment(); 
    let momentObj = moment(control.value.substring(0, 2)+'-'+control.value.substring(2, 4)+'-'+control.value.substring(4), "MM-DD-YYYY",true) 
    let day =  momentObj.day();
    let year = momentObj.year();
    let month = momentObj.month();
    if(!momentObj.isValid() || !(year >= 1900 && year <= moment().get('year'))) {
      return {'invalid_BD_CD':true};  
    }
    if( ((a.year()-year) == 63) && ((a.month()-month) < 10) ){
      return {'invalid_BD_TY':true}; 
    }else if((a.year()-year) < 63){
      return {'invalid_BD_TY':true}; 
    }

    return null;   

  }

  emailValidation (control: FormControl): {[s: string]:boolean} {
    let email_REGEXP = /[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}/gi;
    if(control.value == ""){
      return null;
    }else{
      let patternMatch = email_REGEXP.test(control.value);
      return patternMatch ? null : {'invalidEmail': true};
    }
  }
  

 
  
}
