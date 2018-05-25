export class ModelPopupModel {
  modalPopUpContent: string;
  returnToAppBtn: string;
  learnMoreAbtOETitle:string;
  cancelPopupTitle:string;
  cancelPopupContent:string;
  backBtn:string;
  cancelBtn:string;
  leavingsitepopupTitle:string;
  leavingsitepopupContent:string;
  proceedBtn:string;
  cancelButton:string;
  

  constructor(data: {
    modalPopUpContent? : string,
    returnToAppBtn?: string,
    learnMoreAbtOETitle?:string,    
    cancelPopupTitle?: string,
    cancelPopupContent?: string,
    backBtn?: string,    
    cancelBtn?: string,
    leavingsitepopupTitle?: string,
    leavingsitepopupContent?: string,
    proceedBtn?: string,
    cancelButton?: string,
    
    } = {}){
      this.modalPopUpContent = data.modalPopUpContent || '';
      this.returnToAppBtn = data.returnToAppBtn || '';
      this.learnMoreAbtOETitle = data.learnMoreAbtOETitle || '';
	    this.cancelPopupTitle = data.cancelPopupTitle ||'';
      this.cancelPopupContent = data.cancelPopupContent ||'';
      this.backBtn = data.backBtn ||'';      
      this.cancelBtn = data.cancelBtn ||'';    
      this.leavingsitepopupTitle = data.leavingsitepopupTitle ||'';    
      this.leavingsitepopupContent = data.leavingsitepopupContent ||'';  
      this.proceedBtn = data.proceedBtn ||'';    
      this.cancelButton = data.cancelButton ||'';    
    }




  }
