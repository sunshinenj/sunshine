

export class ConfigurationData{
    OLEPlanName : string; 
    OLEYear : string; 
    OLEZip : string; 
    OLECountyName : string; 
    OLEPremium : string; 
    PlanType : string; 
    StateCode : string; 
    FipsCode : string; 
    HNumber : string; 
    PBPNumber : string; 
    RiderFlag : string; 
    CMScode : string; 
    PrefferedPlanId : string; 
    PlanCode : string; 
    mapsPlanType : string; 

    constructor(data: {
        OLEPlanName? : string, 
        OLEYear? : string, 
        OLEZip? : string,
        OLECountyName? : string, 
        OLEPremium? : string, 
        PlanType? : string,
        StateCode? : string, 
        FipsCode? : string, 
        HNumber? : string,
        PBPNumber? : string, 
        RiderFlag? : string, 
        CMScode? : string,
        PrefferedPlanId? : string, 
        PlanCode? : string, 
        mapsPlanType? : string,
    } = {}) {
      
        this.OLEPlanName = data.OLEPlanName; 
        this.OLEYear = data.OLEYear; 
        this.OLEZip  = data.OLEZip; 
        this.OLECountyName  = data.OLECountyName; 
        this.OLEPremium  = data.OLEPremium; 
        this.PlanType  = data.PlanType; 
        this.StateCode  = data.StateCode; 
        this.FipsCode  = data.FipsCode; 
        this.HNumber  = data.HNumber; 
        this.PBPNumber  = data.PBPNumber; 
        this.RiderFlag  = data.RiderFlag; 
        this.CMScode  = data.CMScode; 
        this.PrefferedPlanId  = data.PrefferedPlanId; 
        this.PlanCode  = data.PlanCode; 
        this.mapsPlanType  = data.mapsPlanType; 
     }



}

