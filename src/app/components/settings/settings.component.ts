import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
import { logoutAction } from 'src/app/store/actions/login.action';
import { updateCurrentUserAction } from 'src/app/store/actions/updateCurrentUser.action';
import { currentUserSelector } from 'src/app/store/selectors';
import { isSubmittingSelector, validationErrorsSelector } from './selector';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) { }
 
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }


  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store.pipe(select(currentUserSelector),
    filter(Boolean)).subscribe((currentUser: CurrentUserInterface)=> {
      this.currentUser = currentUser;
      this.initializeForm();
    })
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      biography: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    })
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }
   this.store.dispatch(updateCurrentUserAction({currentUserInput: currentUserInput}))
  }

  logout(): void {
   this.store.dispatch(logoutAction())
  }

}
