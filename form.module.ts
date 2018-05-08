 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';
 import {NgxMaskModule} from 'ngx-mask';
 import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 import { CommonModule } from "@angular/common";
 import { OleModalPopupComponent } from "../ole-modal-popup/ole-modal-popup.component";
 import { ModalPopupModule } from "../ole-modal-popup/ole-modal-popup.module";
 import { FormComponent } from "./form.component";
 import { MedicareInsuranceInfComponent } from "../medicare-insurance-inf/medicare-insurance-inf.component";

 const formRoute : Routes =[
 {path:'', component : FormComponent,children :[
      {path:':id', component : OleModalPopupComponent },
    ] 
 },
];

@NgModule({
  declarations:[
    FormComponent,
    MedicareInsuranceInfComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalPopupModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(formRoute)
  ],
  exports:[FormComponent]
 })
export class FormComponentModule {
  constructor() { }
  
}


