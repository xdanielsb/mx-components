import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  Input,
  model,
  OnDestroy,
  Optional,
  Self,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface FormControlType {
  percentage: FormControl<number | null>;
}

@Component({
  selector: 'mx-input-percentage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mx-input-percentage.component.html',
  styleUrl: './mx-input-percentage.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: MxInputPercentageComponent },
  ],
})
export class MxInputPercentageComponent
  implements
    MatFormFieldControl<number | null>,
    ControlValueAccessor,
    OnDestroy
{
  static nextId = 0;
  readonly percentageInput = viewChild.required<HTMLInputElement>('percentage');
  ngControl = inject(NgControl, { optional: true, self: true });
  readonly form: FormGroup<FormControlType>;
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'percentage-input';
  readonly id = `percentage-input-${MxInputPercentageComponent.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', {
    alias: 'aria-describedby',
  });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly _value = model<number | null>(null, { alias: 'value' });
  onChange = (_: any) => {};
  onTouched = () => {};

  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(
    () => this._disabledByInput() || this._disabledByCva(),
  );
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get focused(): boolean {
    return this._focused();
  }

  get empty() {
    return !this.form.controls.percentage.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get value(): number | null {
    return this._value();
  }

  get errorState(): boolean {
    return this.form.invalid && this.touched();
  }
  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.form = inject(FormBuilder).group({
      percentage: [null, [Validators.min(0), Validators.max(100)]],
    }) as FormGroup<FormControlType>;

    effect(() => {
      // Read signals to trigger effect.
      this._placeholder();
      this._required();
      this._disabled();
      // Propagate state changes.
      untracked(() => this.stateChanges.next());
    });

    effect(() => {
      if (this._disabled()) {
        untracked(() => this.form.disable());
      } else {
        untracked(() => this.form.enable());
      }
    });

    effect(() => {
      untracked(() => this.form.setValue({ percentage: this._value() }));
    });

    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this._updateValue(value.percentage);
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn() {
    if (!this._focused()) {
      this._focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement,
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement =
      this._elementRef.nativeElement.querySelector('.percentage-input')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.form.controls.percentage.valid) {
      this._focusMonitor.focusVia(this.percentageInput(), 'program');
    }
  }

  writeValue(tel: number | null): void {
    this._updateValue(tel);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  private _updateValue(tel: number | null) {
    this._value.set(tel);
  }
}
