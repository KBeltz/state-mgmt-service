import { ComponentName } from "../enum/state-store.enum";

export interface FormState {
  [ComponentName.FirstFormComponent]: boolean;
  [ComponentName.SecondFormComponent]: boolean;
  [ComponentName.ThirdFormComponent]: boolean;
}

export interface StateStore {
  promo: string;
  membership: string;
  code: string;
  areAllFormsValid: FormState;
}
