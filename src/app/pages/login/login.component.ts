import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';
import { map } from 'rxjs/operators';

import { LOGIN_FORM } from '@app/pages/login/login.constant';
import { LoginUserOperation } from '@app/pages/login/login.model';
import { LoginService } from '@app/pages/login/login.service';

import { AUTH } from '@app/shared/constants/auth.constant';
import { FormState } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formState: FormState;

  private subscription: Subscription;

  constructor(
    private formService: FormService,
    private loginService: LoginService,
    private router: Router,
    private titleService: Title,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.setupForm();

    this.titleService.setTitle('Dashboard - CinemaNz Admin');

    this.subscription.add(this.formStateSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setupForm(): void {
    this.formService.setup(LOGIN_FORM);
  }

  login(): void {
    const { form } = this.formState;

    if (form.invalid) {
      this.formService.validate();
      return;
    }

    const { email, password } = form.controls;

    this.loginService
      .login(email.value, password.value)
      .pipe(map(({ data }) => data))
      .subscribe((data: LoginUserOperation) => {
        const { result } = data.loginUser;

        localStorage.setItem(AUTH.token, result.token);

        this.router.navigate(['/dashboard'], {
          replaceUrl: true,
        });
      });
  }

  private formStateSubscription(): SubscriptionLike {
    return this.formService.state$.subscribe((formState: FormState) => {
      this.formState = formState;
    });
  }
}
