import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';

import { LOGIN_FORM } from '@app/pages/login/login.constant';
import { LoginUserOperation } from '@app/pages/login/login.model';
import { LoginService } from '@app/pages/login/login.service';

import { AUTH } from '@app/shared/constants/auth.constant';
import { FormStore } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formStore: FormStore;

  private subscription: Subscription;

  constructor(
    private formService: FormService,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.setupForm();

    this.subscription.add(this.formServiceSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setupForm(): void {
    this.formService.setup(LOGIN_FORM);
  }

  login(): void {
    const { form } = this.formStore;

    if (form.invalid) {
      this.formService.validate();
      return;
    }

    const { email, password } = form.controls;

    this.loginService
      .login(email.value, password.value)
      .subscribe(({ data }: { data: LoginUserOperation }) => {
        const { result } = data.loginUser;

        localStorage.setItem(AUTH.token, result.token);

        this.router.navigate(['/dashboard'], {
          replaceUrl: true,
        });
      });
  }

  private formServiceSubscription(): SubscriptionLike {
    return this.formService.data$.subscribe((formData: FormStore) => {
      this.formStore = formData;
    });
  }
}
