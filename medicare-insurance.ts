export class MedicareInsurance{
  medicInsnceInfoHeading : string;
  medicInsnceInfoHeadinglegend : string;
  medicInsnceInfoparaText: string;
  filltheinfotext : string;
  indicatesrequiredfields : string;
  imageASrc: string;
  imageBSrc: string;
  imageAText : string;
  imageBText : string;
  nextButtonText: string;
  backButtonText: string;
  cancelEnrollmentButtonText: string;
  cardType : string;
 

  constructor(data: {
      heading? : string,
      medicarecardstitle? : string,
      medicarecardscontent?: string,
      filltheinfotext? : string,
      required? : string,
      img1? : string;
      img2? : string;
      imgtxtA? : string;
      imgtxtB? : string;
      nxtbtn? : string;
      bckbtn? : string;
      cancellnk? : string;

    } = {}) {
    this.medicInsnceInfoHeading = data.heading || '';
    this.medicInsnceInfoHeadinglegend = data.medicarecardstitle || '';
    this.medicInsnceInfoparaText = data.medicarecardscontent  || '';
    this.filltheinfotext = data.filltheinfotext || '';
    this.indicatesrequiredfields = data.required || '';
    this.imageASrc = data.img1.split("\"")[1] ||'';
    this.imageBSrc = data.img2.split("\"")[1] ||'';
    this.imageAText = data.imgtxtA || '';
    this.imageBText = data.imgtxtB || '';
    this.nextButtonText = data.nxtbtn || '';
    this.backButtonText = data.bckbtn || '';
    this.cancelEnrollmentButtonText = data.cancellnk || '';
    
  }
  
}
