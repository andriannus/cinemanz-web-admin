import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';

import { LOGIN_FORM } from '@app/pages/login/login.constant';

import { FormStore } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formStore: FormStore;

  private subscription: Subscription;

  constructor(private formService: FormService) {
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

    // Call GraphQL API
  }

  private formServiceSubscription(): SubscriptionLike {
    return this.formService.data$.subscribe((formData: FormStore) => {
      this.formStore = formData;
    });
  }
}
