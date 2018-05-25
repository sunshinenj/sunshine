 import { NgModule } from '@angular/core';
 import { CommonModule } from "@angular/common";
 import { OleModalPopupComponent } from "../ole-modal-popup/ole-modal-popup.component";

@NgModule({
  declarations:[
    OleModalPopupComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[OleModalPopupComponent]
 })
export class ModalPopupModule {
  constructor() { }
}
