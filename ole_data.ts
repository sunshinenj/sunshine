import { MedicareInsurance } from "../models/medicare-insurance";
import { ModelPopupModel } from '../models/model-popup';
import { WelcomeToOLE } from '../models/welcome';
import { SubmissionConfirmationModel } from '../models/submission-confirmation';
import { pcpPageDataToOle } from '../models/pcp_data';
import { OLEReviewDocument } from '../models/review-document';
import { ConfigurationData } from '../models/configuration-data';
import { RightRail } from '../models/rightrail';

export class OleData {
  medicareInsData:MedicareInsurance;
  modalPopupData: ModelPopupModel;
  submisssionConfirmationData:SubmissionConfirmationModel;
  welcomeToOLEData: WelcomeToOLE;
  pcpPageData : pcpPageDataToOle;
  reviewDocumentData:OLEReviewDocument;
  masterListQuestions : any 
  commonQuestions : Array<any>;
  configurationData: ConfigurationData;
  oleErrorMsgs : any;
  medicareInsFormData: any;
  rightRailData : RightRail;  
  olecmscode:any;

  constructor(){
      
  }
  
  setConfigurationData(configurationData: ConfigurationData){
    this.configurationData =  configurationData;
    } 

  setMedicareInsData(medicareInsData:MedicareInsurance){
      this.medicareInsData = medicareInsData ;
  }
 
  setModalPopupData(modalPopupData:ModelPopupModel){
    this.modalPopupData = modalPopupData;
  }
  
  setSubmisssionConfirmationData(submisssionConfirmationData:SubmissionConfirmationModel){
    this.submisssionConfirmationData = submisssionConfirmationData;
  }
  
  setWelcomeToOLE(welcomeToOLEData:WelcomeToOLE){
      this.welcomeToOLEData = welcomeToOLEData;
  }

  setPcpPageData(pcpPageData:pcpPageDataToOle){
      this.pcpPageData = pcpPageData;
  }

  setReviewDocumentData(reviewDocumentData:OLEReviewDocument){
      this.reviewDocumentData = reviewDocumentData
  }
  setMasterListQuestions(masterListQuestions:any){
      this.masterListQuestions = masterListQuestions ;
  }

  setCommonQuestions(commonQuestions: Array<any>){
      this.commonQuestions = commonQuestions;
  }

  setErrorMsgs(errorMsgs: any){
    this.oleErrorMsgs = errorMsgs;
    }
    
  setRightRailData(rightRailData : RightRail){
    
      this.rightRailData = rightRailData;
  
  }  
  setolecmscode(olecmscode : any){
    
    this.olecmscode = olecmscode;

} 
}
