import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MxInputPercentageComponent } from 'mx-angular-inputs';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MxInputPercentageComponent,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    AsyncPipe,
    MatError,
    JsonPipe,
    MatHint,
    MatIcon,
    MatSuffix,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      percentage: [0, [Validators.min(0), Validators.max(100)]],
    });
  }
}
