import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { loadTrainerInfoSuccess } from '../../../../core/store/actions/trainer.actions';
import { Store } from '@ngrx/store';
import { TrainerState } from '../../../../core/store/reducers/trainer.reducer';
import { TrainerProfile } from '../../../../core/interfaces/trainer-profile';
import { AppState } from '../../../../core/store/states/app.state';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  profileForm: FormGroup;

  isMinor = false;
  isImageUploaded = false;
  actualAge: number = 0;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbies: string[] = [];
  allHobby: string[] = [
    'Jugar Fútbol',
    'Jugar Basquetball',
    'Jugar Tennis',
    'Jugar Voleibol',
    'Jugar Fifa',
    'Jugar Videojuegos',
  ];

  filteredHobbies$: Observable<string[] | null> = of(this.allHobby);
  trainerInfo$: Observable<TrainerProfile | null>;

  myFilter = (d: Date | null): boolean => {
    return d !== null && d < new Date();
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      favoriteHobby: [['']],
      birthdate: ['', Validators.required],
      dui: [''],
      minorityCard: [''],
    });

    this.trainerInfo$ = store.select('trainer', 'trainer');

    this.trainerInfo$.subscribe(res => {
      this.isImageUploaded = !!res?.imageUrl;
    });

    this.profileForm
      .get('dui')
      ?.setValidators([Validators.required, this.validateDui.bind(this)]);

    this.getFormControl('birthdate').valueChanges.subscribe(res => {
      if (res) {
        const years =
          (new Date().getTime() - res.getTime()) /
          (1000 * 60 * 60 * 24 * 365.3);

        this.actualAge = Math.floor(years);
        this.isMinor = years < 18;

        if (this.isMinor) {
          this.getFormControl('dui').clearValidators();
          this.getFormControl('dui').updateValueAndValidity();
          this.getFormControl('minorityCard').setValidators(
            Validators.required
          );
        } else {
          this.getFormControl('minorityCard').clearValidators();
          this.getFormControl('minorityCard').updateValueAndValidity();
          this.getFormControl('dui').setValidators([
            Validators.required,
            this.validateDui.bind(this),
          ]);
        }
      }
    });

    this.getFormControl('dui').valueChanges.subscribe(res => {
      const newRes = res.replace(/[^\d-]/g, '');

      if (newRes.length === 9 && !newRes.includes('-')) {
        const arraySplit = newRes.split('');
        arraySplit.splice(8, 0, '-');
        this.getFormControl('dui').setValue(arraySplit.join(''), {
          emitEvent: false,
        });
      } else {
        this.getFormControl('dui').setValue(newRes, {
          emitEvent: false,
        });
      }
    });

    this.getFormControl('minorityCard').valueChanges.subscribe(res => {
      this.getFormControl('minorityCard').setValue(
        res.replace(/[^\da-zA-Z-]/g, ''),
        {
          emitEvent: false,
        }
      );
    });

    this.getFormControl('name').valueChanges.subscribe(res => {
      let newRes = res.replace(/[^a-zA-Z ]/g, '');

      if (newRes.trim().length === 0) {
        newRes = newRes.trim();
      }

      this.getFormControl('name').setValue(newRes, {
        emitEvent: false,
      });
    });

    this.getFormControl('favoriteHobby').valueChanges.subscribe(() => {
      this.filteredHobbies$ = of(
        this.allHobby.filter(item => !this.hobbies.includes(item))
      );
    });
  }

  getFormControl(control: string): AbstractControl {
    return <AbstractControl>this.profileForm.get(control);
  }

  onlyDigits(event: KeyboardEvent) {
    let ASCIICode = event.which || event.keyCode;
    const actualValue = this.getFormControl('dui').value;

    if (
      ASCIICode === 127 ||
      ASCIICode === 8 ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (
      actualValue.length > 9 ||
      (ASCIICode > 31 &&
        (ASCIICode < 48 || ASCIICode > 57) &&
        (ASCIICode < 96 || ASCIICode > 105))
    ) {
      event.preventDefault();
    }

    if (actualValue.length === 8) {
      this.getFormControl('dui').setValue(actualValue + '-');
    }
  }

  validateDui(control: { value: string }): { [key: string]: any } | null {
    const duiPattern = /^\d{8}-\d{1}$/;
    const isValid = duiPattern.test(control.value);

    return isValid ? null : { invalidDui: true };
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hobbies.push(value);
    }
    event.chipInput!.clear();
    this.getFormControl('favoriteHobby').setValue(this.hobbies);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.getFormControl('favoriteHobby').setValue(this.hobbies);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
    this.getFormControl('favoriteHobby').setValue(this.hobbies);
  }

  forceShow = true;
  saveCoachProfile(): void {
    if ((!this.profileForm.valid || !this.isImageUploaded) && this.forceShow) {
      this.forceShow = false;
      return;
    }

    if (this.profileForm.valid && this.isImageUploaded) {
      this.getFormControl('name').setValue(
        this.getFormControl('name').value.trim()
      );

      this.store.dispatch(
        loadTrainerInfoSuccess({
          info: {
            ...this.profileForm.value,
            isMinor: this.isMinor,
            age: this.actualAge,
          },
        })
      );

      this.router.navigate(['/team-formation']);
    }
  }
}
