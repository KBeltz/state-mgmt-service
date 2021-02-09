import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FirstFormComponent } from './component/first-form/first-form.component';
import { SecondFormComponent } from './component/second-form/second-form.component';
import { StoreService } from './common/store/store.service';
import { WorkflowComponent } from './component/workflow/workflow.component';
import { ThirdFormComponent } from './component/third-form/third-form.component';
import { SummaryComponent } from './component/summary/summary.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ 
    AppComponent,
    FirstFormComponent,
    SecondFormComponent,
    WorkflowComponent,
    ThirdFormComponent,
    SummaryComponent 
  ],
  providers: [ StoreService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
