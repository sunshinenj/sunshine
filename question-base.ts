export class QuestionBase<T>{
  value: string;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  subQuesFormName: string;
  subQuesRule: string;
  subQuestion : any;
  formcontrols :  any;
  placeholder : string;
  validation : string;
  warnrule: string;
  warnmsg : any;
  dynamic : any;
  default : any;
  
  constructor(options: {
      value?: string,
      key?: string,
      label?: string,
      txtlabel?: string,
      chklabel ?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      subrule?: string,
      subQuesFormName?: string,
      sub?: any,
      formcontrols?: string,
      validation?: any,
      placeholder?: string
      path?:string;
      warnrule?: string;
      warnmsg?: string;
      dynamic?: string;
      default?: string;

    } = {}) {
    this.value = options.default || '';
    this.key = options.key || '';
    if(options.txtlabel != null){
    this.label = options.txtlabel ;
    }
    else if(options.chklabel != null){
      this.label = options.chklabel ;
    }
    else {
      this.label =options.label || '';
    }
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.subQuesRule = options.subrule;
    this.subQuesFormName =  options.subQuesFormName;
    this.subQuestion = options.sub;
    this.placeholder = options.placeholder;
    this.formcontrols = options.formcontrols;
    this.validation = options.validation;
    this.warnrule = options.warnrule;
    this.warnmsg = options.warnmsg;
    this.dynamic = options.dynamic;
    this.default = options.default;


    //console.log("this.options" + JSON.stringify(this.default));
  }
}
