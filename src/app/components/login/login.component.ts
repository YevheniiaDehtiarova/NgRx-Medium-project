import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { loginAction } from 'src/app/store/actions/login.action';
import { isSubmittingSelector, validationErrorsSelector } from 'src/app/store/selectors';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder,
              private store: Store) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  public initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

  public initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)); 
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  public onSubmit(): void {;
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }

}
