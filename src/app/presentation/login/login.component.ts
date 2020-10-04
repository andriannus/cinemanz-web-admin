import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';

import { LoginUseCase } from '@app/core/use-cases/login.use-case';

import { LOGIN_FORM } from './login.constant';

import { AUTH } from '@app/shared/constants/auth.constant';
import { FormState } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';
import { LoginResponse } from '@app/data/repository/auth-app-repository/auth-app.entity';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formState: FormState;

  private subscription: Subscription;

  constructor(
    private formService: FormService,
    private loginUseCase: LoginUseCase,
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

    this.loginUseCase
      .execute(form.value)
      .subscribe(({ result }: LoginResponse) => {
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
