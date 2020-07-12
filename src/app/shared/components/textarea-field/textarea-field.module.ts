import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextareaFieldComponent } from '@app/shared/components/textarea-field/textarea-field.component';

@NgModule({
  declarations: [TextareaFieldComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TextareaFieldComponent],
})
export class TextareaFieldModule {}
