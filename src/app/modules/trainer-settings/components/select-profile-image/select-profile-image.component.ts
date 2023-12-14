import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TrainerState } from '../../../../core/store/reducers/trainer.reducer';
import {
  loadTrainerImage,
  loadTrainerImageSuccess,
} from '../../../../core/store/actions/trainer.actions';

@Component({
  selector: 'app-select-profile-image',
  templateUrl: './select-profile-image.component.html',
  styleUrls: ['./select-profile-image.component.scss'],
})
export class SelectProfileImageComponent {
  selectedImage: SafeUrl | null = 'assets/svg/user.svg';
  imageName?: string = '';
  isUpload = false;

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<{ trainer: TrainerState }>
  ) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      this.imageName = file.name;
      this.isUpload = true;

      const imageUrl = URL.createObjectURL(file);
      this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

      this.store.dispatch(
        loadTrainerImageSuccess({ image: String(this.selectedImage) })
      );
    }
    inputElement.value = '';
  }

  removeSelection() {
    this.selectedImage = 'assets/svg/user.svg';
    this.imageName = '';
    this.isUpload = false;
    this.store.dispatch(loadTrainerImageSuccess({ image: null }));
  }
}
