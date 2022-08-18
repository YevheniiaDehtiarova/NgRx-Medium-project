import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { RegisterRequestInterface } from '../../auth/types/registerRequest.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder,
              private store: Store,
              private authService: AuthService) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  public initializeForm(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
    })
  }

  public initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)); 
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  public onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }

}
