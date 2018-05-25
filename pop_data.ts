export class pcpPageDataToOle {
  pcpMainHeading: string;
  yourProgressTxt: string;
  lookUpProviderBtn: string;
  headingPara1: string;
  headingPara2: string;
  importantContent: string;
  providerContactInfoTxt:string;
  providerContactInfoContent:string;
  doctorFullNameTxt:string;
  HsptlInfoTxt:string;
  HsptlName: string;
  phoneNoTxt:string;
  helptxt: string;
  cityTxt:string;
  stateTxt:string;
  zipTxt:string;
  pcpNoteContent: string;
  backBtn:string;
  nextBtn:string;
  cancelEnrollmnt:string;



  constructor(data: {
    pcpMainHeading?: string,
    yourProgressTxt?: string,
    lookUpProviderBtn?: string,
    headingPara1?:string,
    headingPara2?:string,
    importantContent?:string,
    providerContactInfoTxt?:string,
    providerContactInfoContent?:string,

    doctorFullNameTxt?:string,
    HsptlInfoTxt?:string,
    HsptlName?: string,
    phoneNoTxt?:string,
    helptxt?: string,
    cityTxt?:string,
    stateTxt?:string,
    zipTxt?:string,
    pcpNoteContent?: string,
    backBtn?:string,
    nextBtn?:string,
    cancelEnrollmnt?:string,




    } = {}){
      this.pcpMainHeading = data.pcpMainHeading || '';
      this.yourProgressTxt = data.yourProgressTxt || '';
      this.lookUpProviderBtn = data.lookUpProviderBtn || '';
      this.headingPara1 = data.headingPara1 || '';
      this.headingPara2 = data.headingPara2 || '';
      this.importantContent = data.importantContent || '';
      this.providerContactInfoTxt = data.providerContactInfoTxt || '';
      this.providerContactInfoContent = data.providerContactInfoContent || '';

      this.doctorFullNameTxt = data.doctorFullNameTxt  || '';
      this.HsptlInfoTxt = data.HsptlInfoTxt || '';
      this.HsptlName = data.HsptlName ||'';
      this.phoneNoTxt = data.phoneNoTxt || '';
      this.helptxt = data.helptxt || '';
      this.cityTxt = data.cityTxt || '';
      this.stateTxt = data.stateTxt || '';
      this.zipTxt = data.zipTxt || '';
      this.pcpNoteContent = data.pcpNoteContent || '';
      this.backBtn = data.backBtn || '';
      this.nextBtn = data.nextBtn || '';
      this.cancelEnrollmnt = data.cancelEnrollmnt || '';

    }

    }
