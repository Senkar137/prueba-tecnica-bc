import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  CommonModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
];

@NgModule({
  imports: [modules],
  declarations: [],
  exports: [modules, FormsModule],
})
export class SharedModule {}
