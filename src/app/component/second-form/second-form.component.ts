import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StoreService } from '../../common/store/store.service';
import { ComponentName } from '../../shared/enum/state-store.enum';
import { StateStore } from '../../shared/interface/state-store.interface';

@Component({
  selector: 'app-second',
  templateUrl: './second-form.component.html',
})
export class SecondFormComponent implements OnInit, OnDestroy  {
  componentName: ComponentName = ComponentName.SecondFormComponent;
  form: FormGroup;
  state: StateStore;
  storeSubscription: Subscription;

  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.form = this.fb.group({
      promo: '0'
    })
    this.storeService.setAreAllFormsValid(this.componentName, this.form.valid); // more useful in scenarios where forms have validation and are not radio buttons, leftover from another use case demo
  }

  ngOnInit(): void {
    this.storeSubscription = this.storeService.getState().subscribe(state => {
      this.state = state;
    })
  }

  ngOnDestroy(): void {
    if(this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  setPromo(): void {
    this.storeService.setPromo(this.form.controls.promo.value);
  }
}