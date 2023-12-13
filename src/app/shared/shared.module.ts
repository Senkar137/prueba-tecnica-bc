import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const modules = [
  CommonModule,
  FormsModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: [modules],
  declarations: [],
  exports: [modules],
})
export class SharedModule {}
