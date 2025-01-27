export default interface FormControl {
  disabled: boolean;
  form: HTMLFormElement | null;
  hideLabel: boolean;
  label?: string;
  name: string;
  orientation: 'horizontal' | 'vertical';
  privateSplit?: 'left' | 'middle';
  required: boolean;
  summary?: string;
  tooltip?: string;
  validity: ValidityState;
  value: string | string[];
  willValidate: boolean;
  checkValidity(): boolean;
  formAssociatedCallback(): void;
  formResetCallback(): void;
  reportValidity(): boolean;
  resetValidityFeedback(): void;
  setCustomValidity(message: string): void;
  setValidity(flags?: ValidityStateFlags, message?: string): void;
}
