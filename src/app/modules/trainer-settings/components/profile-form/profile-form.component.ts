import { Component, Input } from '@angular/core';
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
import { TrainerProfile } from '../../../../core/interfaces/trainer-profile';
import { AppState } from '../../../../core/store/states/app.state';
import { selectTFTrainer } from '../../../../core/store/selectors/main.selector';
import { hasRequiredInfo } from '../../../../core/guards/trainer-registration.guard';

interface ProfileForm {
  name: string;
  favoriteHobby: string[];
  birthdate: Date | null;
  dui: string;
  minorityCard: string;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Input() isNotEdit = true;

  profileForm: FormGroup;

  isMinor = false;
  isImageUploaded = false;
  forceShowButton = true;
  selectable = true;
  removable = true;

  actualAge: number = 0;

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
      name: '',
      favoriteHobby: [],
      birthdate: null,
      dui: '',
      minorityCard: '',
    } as ProfileForm);

    this.getFormControl('name').setValidators([Validators.required]);

    this.getFormControl('birthdate').setValidators([Validators.required]);

    this.getFormControl('dui').setValidators([
      Validators.required,
      this.validateDui.bind(this),
    ]);

    this.trainerInfo$ = this.store.select(selectTFTrainer);

    this.trainerInfo$.subscribe(res => {
      if (!!res && hasRequiredInfo(res)) {
        if (!(res.birthdate instanceof Date)) {
          res = {
            ...res,
            birthdate: new Date(res.birthdate as unknown as string),
          };
        }

        this.profileForm.patchValue({
          name: res.name,
          birthdate: res.birthdate,
          dui: res.dui,
          minorityCard: res.minorityCard,
        } as ProfileForm);

        this.updateBirthdateInfo(res.birthdate as Date);
      }
      this.isImageUploaded = !!res?.imageUrl;
    });

    this.checkFormControlsData();
  }

  checkFormControlsData() {
    this.getFormControl('birthdate').valueChanges.subscribe(res => {
      if (res && res instanceof Date) {
        this.updateBirthdateInfo(res);
      }
    });

    this.getFormControl('dui').valueChanges.subscribe((res: string) => {
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

    this.getFormControl('minorityCard').valueChanges.subscribe(
      (res: string) => {
        this.getFormControl('minorityCard').setValue(
          res.replace(/[^\da-zA-Z-]/g, ''),
          {
            emitEvent: false,
          }
        );
      }
    );

    this.getFormControl('name').valueChanges.subscribe((res: string) => {
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

  updateBirthdateInfo(date: Date) {
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = (new Date().getTime() - date.getTime()) / millisecondsInYear;
    this.isMinor = years < 18;
    this.actualAge = Math.floor(years);

    if (this.isMinor) {
      this.getFormControl('dui').clearValidators();
      this.getFormControl('dui').updateValueAndValidity();
    } else {
      this.getFormControl('dui').setValidators([
        Validators.required,
        this.validateDui.bind(this),
      ]);
    }
  }

  onlyDigits(event: KeyboardEvent) {
    let ASCIICode = event.which || event.keyCode;
    const actualValue = this.getFormControl('dui').value;

    if (
      ASCIICode === 8 || // delete
      ASCIICode === 9 || // tab
      ASCIICode === 13 || // enter
      ASCIICode === 127 || // delete
      (ASCIICode >= 37 && ASCIICode <= 40) || // cursor keys
      event.ctrlKey || // ctrl
      event.metaKey // cmd
    ) {
      return;
    }

    if (
      actualValue.length > 9 ||
      (ASCIICode > 31 && // numbers
        (ASCIICode < 48 || ASCIICode > 57) && // numbers
        (ASCIICode < 96 || ASCIICode > 105)) // numbers (numeric keypad)
    ) {
      event.preventDefault();
    }

    if (actualValue.length === 8) {
      this.getFormControl('dui').setValue(actualValue + '-');
    }
  }

  validateDui(control: { value: string }): { [key: string]: any } | null {
    const duiPattern = /^\d{8}-\d$/;
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

  saveCoachProfile(event: Event): void {
    event.preventDefault();
    if (
      (!this.profileForm.valid || !this.isImageUploaded) &&
      this.forceShowButton
    ) {
      this.forceShowButton = false;
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

      this.router.navigate(
        this.isNotEdit ? ['/team-formation'] : ['/trainer-profile']
      );
    }
  }
}
