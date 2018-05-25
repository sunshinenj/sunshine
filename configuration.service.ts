
export function configServiceFactory(config: ConfigurationService) {
    return () => config.getConfig();
}


declare var initOLE : any;
export class ConfigurationService {
  private oleClient : any = {};
  constructor(){ }
  getConfig() {
    const url = 'assets/data.json';
    console.log("app initialized");
    if(typeof(initOLE)==="function"){
      this.oleClient = initOLE();   
   
    }else {
      this.oleClient = {  
        "siteId":"aarp",
        "OLEPlanName":"AARP MedicareComplete SecureHorizons Plan 1 (HMO)",
        "OLEYear":"2018",
        "OLEZip":"90210",
        "OLECountyName":"Los Angeles County",
        "OLEPremium":"0.00",
        "OLEPremiumMonth":"a month",
        "PlanType":"MAPD",
        "StateCode":"CA",
        "FipsCode":"037",
        "HNumber":"H0543",
        "PBPNumber":"001",
        "RiderFlag":"true",
        "CMScode":"200",
        "PrefferedPlanId":"H0543001000",
        "PlanCode":"",
        "mapsPlanType":"HMO"
     };
    }  
  }
  getOleClient(){
    return this.oleClient;
  }
}
