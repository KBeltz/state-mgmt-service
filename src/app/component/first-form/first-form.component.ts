import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { StoreService } from "../../common/store/store.service";
import { ComponentName } from "../../shared/enum/state-store.enum";
import { StateStore } from "../../shared/interface/state-store.interface";

@Component({
  selector: "app-first",
  templateUrl: "./first-form.component.html"
})
export class FirstFormComponent implements OnInit, OnDestroy {
  componentName: ComponentName = ComponentName.FirstFormComponent;
  form: FormGroup;
  state: StateStore;
  storeSubscription: Subscription;

  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.form = this.fb.group({
      membership: '0'
    });
    this.storeService.setAreAllFormsValid(this.componentName, this.form.valid); // more useful in scenarios where forms have validation and are not radio buttons, leftover from another use case demo
  }

  ngOnInit(): void {
    this.storeSubscription = this.storeService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  setMembership(): void {
    this.storeService.setMembership(this.form.controls.membership.value);
  }
}
