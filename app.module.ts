import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent }                 from './app.component';
import {Ng2Webstorage} from 'ngx-webstorage';
import { HttpClientModule}              from "@angular/common/http";
import { WelcomeOleComponent } from './components/welcome-ole/welcome-ole.component';
import { OleReviewComponent } from './components/ole-review/ole-review.component';
import { OleSubmitConfirmationComponent } from './components/ole-submit-confirmation/ole-submit-confirmation.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigurationService, configServiceFactory } from "./services/configuration.service";
import { OleModalPopupComponent } from './components/ole-modal-popup/ole-modal-popup.component';
import { PopupService } from "./services/popup.service";
import { TooltipService } from "./services/tooltip.service"
import {OleCompleteDataService} from "./services/ole-complete-data.service";
import { ModalPopupModule } from "./components/ole-modal-popup/ole-modal-popup.module";
import { SvgComponentComponent } from './components/svg-component/svg-component.component';
import { OleData } from './models/ole-data';
import { RightRailComponent } from "./components/rightrail/rightrail.component";
import { SafePipe } from './safe.pipe';
import { ValidationService } from "./services/validation.service";

@NgModule({
  imports: [ BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2Webstorage,
    ModalPopupModule
  ],
  declarations: [ AppComponent,
      RightRailComponent,
      WelcomeOleComponent,
      OleReviewComponent,
      OleSubmitConfirmationComponent,
      SvgComponentComponent,
      SafePipe
    ],
    bootstrap: [ AppComponent],
    providers: [
      ConfigurationService,
      {
        provide: APP_INITIALIZER,
        useFactory: configServiceFactory,
        deps: [ConfigurationService],
        multi: true
      },
      PopupService,
      ValidationService,
      TooltipService,
      OleCompleteDataService,
      OleData
    ]
})

export class AppModule {
  constructor() {
  }
}
