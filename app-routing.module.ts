
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomeOleComponent } from './components/welcome-ole/welcome-ole.component';
import { OleReviewComponent } from './components/ole-review/ole-review.component';
import { OleSubmitConfirmationComponent } from './components/ole-submit-confirmation/ole-submit-confirmation.component';
import { OleModalPopupComponent } from "./components/ole-modal-popup/ole-modal-popup.component";

const appRoutes : Routes =[
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {path:'welcome', component : WelcomeOleComponent, children :[
      {path:':id', component : OleModalPopupComponent },
    ]
  },
  {path:'steps/:id', loadChildren : './components/form/form.module#FormComponentModule'},

  {path:'confirmation', component : OleSubmitConfirmationComponent },

  {path:'review', component : OleReviewComponent,children:[
    {path:':id', component : OleModalPopupComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes,{ preloadingStrategy: PreloadAllModules})],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  constructor() {
  }
}
