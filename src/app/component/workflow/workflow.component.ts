import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { StoreService } from "../../common/store/store.service";
import { StateStore } from "../../shared/interface/state-store.interface";

@Component({
  selector: "app-workflow",
  templateUrl: "./workflow.component.html",
  styleUrls: ["./workflow.component.css"]
})
export class WorkflowComponent implements OnInit {
  form: FormGroup;
  formErrors: string[] = [];
  state: StateStore;
  storeSubscription: Subscription;
  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.storeSubscription = this.storeService.getState().subscribe(state => {
      this.state = state;
      console.log('state changed: ', state)
      Object.keys(this.state.areAllFormsValid).forEach(key => {
        if (this.state.areAllFormsValid[key]) {
          this.formErrors = this.formErrors.filter(value => value !== key);
        } else {
          if (!this.formErrors.find(value => value === key)) {
            this.formErrors.push(key);
          }
        }
      });
    });
  }

  submit(): void {
    confirm('Form is valid. Do you want to submit?');
  }
}
