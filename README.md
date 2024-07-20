# MxComponents

This project propose some components to be used in material Angular projects.
- Percentage input (mx-input-percentage)

```sh
<form [formGroup]="form">
  <mat-form-field [appearance]="'outline'">
    <mat-label>{{ "Percentage" }}</mat-label>
    <mx-input-percentage formControlName="percentage"></mx-input-percentage>
    @if (this.form.controls["percentage"].invalid) {
      <mat-error>{{ "Invalid percentage" }}</mat-error>
    }
    <mat-icon matSuffix>percent</mat-icon>
  </mat-form-field>
</form>

```


## Contribute

```sh
ng new . --no-create-application
ng generate library matrix-angular-inputs
ng generate component mx-input-number --project matrix-angular-inputs
```

## Development

Run `ng build --watch mx-angular-inputs` to build the project. The build artifacts will be stored in the `dist/` directory.
In the directory of `package.json` run `npm link dist/mx-angular-inputs`, when you finish with the dev you can
do unlink `npm unlink mx-angular-inputs`.
