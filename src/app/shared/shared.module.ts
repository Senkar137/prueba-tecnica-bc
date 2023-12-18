import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfileComponent } from './components/profile/profile.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ListTypesPipe } from './pipes/list-types.pipe';
import { PokemonIdPipe } from './pipes/pokemon-id.pipe';

const pipes = [ListTypesPipe, PokemonIdPipe];

const modules = [
  CommonModule,
  TranslocoModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  ScrollingModule,
  MatPaginatorModule,
  CarouselModule,
  MatProgressBarModule,
];

const components = [LoaderComponent, ProfileComponent];

@NgModule({
  imports: [modules],
  declarations: [components, pipes],
  exports: [modules, components, pipes],
})
export class SharedModule {}
