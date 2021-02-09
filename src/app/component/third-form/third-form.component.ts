import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, of, Observable } from 'rxjs';
import { StoreService } from '../../common/store/store.service';
import { ComponentName } from '../../shared/enum/state-store.enum';
import { StateStore } from '../../shared/interface/state-store.interface';

@Component({
  selector: 'app-third',
  templateUrl: './third-form.component.html',
  styleUrls: ['./third-form.component.css']
})
export class ThirdFormComponent implements OnInit {
  componentName: ComponentName = ComponentName.ThirdFormComponent;
  form: FormGroup;
  state: StateStore;
  storeSubscription: Subscription;

  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.form = this.fb.group({
      code: ''
    });
    this.storeService.setAreAllFormsValid(this.componentName, this.form.valid);
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

  onSubmit(): void {
    this.validateCode().subscribe((isValid: boolean) => {
      this.storeService.setAreAllFormsValid(ComponentName.ThirdFormComponent, isValid);
      isValid ? this.storeService.setCode(this.form.controls.code.value) : this.storeService.setCode(null);
    })
  }

  // Mocking validation call to back end
  validateCode(): Observable<boolean> {
    const randomInteger: number = Math.floor(Math.random() * 10); // returns random int 0-9
    return of(randomInteger % 2 === 0);
  }

  setCode(): void {
    this.storeService.setCode('first code');
  }
}