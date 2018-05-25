 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router'
 import { OlePrimaryCareProviderComponent } from "./ole-primary-care-provider.component";
 import { CommonModule } from "@angular/common";
 import { OleModalPopupComponent } from "../ole-modal-popup/ole-modal-popup.component";
 import { ModalPopupModule } from "../ole-modal-popup/ole-modal-popup.module";

 const providerRoute : Routes =[
 {path:'', component : OlePrimaryCareProviderComponent,children :[
      {path:':id', component : OleModalPopupComponent },
    ] 
 },
];

@NgModule({
  declarations:[
    OlePrimaryCareProviderComponent
  ],
  imports:[
    CommonModule,
    ModalPopupModule,
    RouterModule.forChild(providerRoute)
  ],
  exports:[OlePrimaryCareProviderComponent]
 })
export class ProviderSearchModule {
  constructor() { }
  refreshScopeListener(){
    let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    let eventer = window[eventMethod];
    let messageEvent = eventMethod == "attachEvent" ? "onstorage" : "storage";
    // Listen to message from child window
    eventer(messageEvent,function(e) {
      
    },false);
}

}
