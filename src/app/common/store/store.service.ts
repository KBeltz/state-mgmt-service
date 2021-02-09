import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { ComponentName } from "../../shared/enum/state-store.enum";
import { StateStore, FormState } from "../../shared/interface/state-store.interface";

@Injectable()
export class StoreService {
  private initialState: StateStore = {
      promo: null,
      membership: null,
      code: null,
      areAllFormsValid: {
        [ComponentName.FirstFormComponent]: false,
        [ComponentName.SecondFormComponent]: false,
        [ComponentName.ThirdFormComponent]: false,
      }
  }
  private readonly _paymentState: BehaviorSubject<StateStore> = new BehaviorSubject<StateStore>(this.initialState);

  // the getter will return the last value emitted in _paymentState subject
  private get paymentState(): StateStore {
    return this._paymentState.getValue();
  }

  // assigning a value to this.paymentState will push it onto the observable 
  // and down to all of its subscribers 
  private set paymentState(value: StateStore) {
    this._paymentState.next(value);
  }

  getState(): Observable<StateStore> {
    return this._paymentState.asObservable();
  }

  setState(state: StateStore): void {
    this.paymentState = state;
  }

  // need to test individual get functions
  getMembership(): Observable<string | void> {
    const state = this.paymentState.membership;
    return of(state);
  }

  setMembership(name: string): void {
    let state = this.paymentState;
    state.membership = name;
    this.paymentState = state;
  }

  getPromo(): Observable<string | void> {
    const state = this.paymentState.promo;
    return of(state);
  }

  setPromo(name: string): void {
    let state = this.paymentState;
    state.promo = name;
    this.paymentState = state;
  }

  getCode(): Observable<string | void> {
    const state = this.paymentState.code;
    return of(state);
  }

  setCode(name: string): void {
    let state = this.paymentState;
    state.code = name;
    this.paymentState = state;
  }

  getAreAllFormsValid(): Observable<FormState | void> {
    const state = this.paymentState.areAllFormsValid;
    return of(state);
  }

  setAreAllFormsValid(componentName: ComponentName, isValid: boolean): void {
    let state = this.paymentState;
    state.areAllFormsValid[componentName] = isValid;
    this.setState(state)
  }
}
