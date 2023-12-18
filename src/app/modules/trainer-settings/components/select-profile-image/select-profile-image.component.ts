import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { loadTrainerImageSuccess } from '../../../../core/store/actions/trainer.actions';
import { AppState } from '../../../../core/store/states/app.state';
import { selectTFTrainer } from '../../../../core/store/selectors/main.selector';
import { take } from 'rxjs/operators';

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
    private store: Store<AppState>
  ) {
    this.store
      .select(selectTFTrainer)
      .pipe(take(1))
      .subscribe(res => {
        if (res && res.imageUrl) {
          this.imageName = res.imageName || 'trainer image';
          this.isUpload = true;

          this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(
            res.imageUrl
          );
        }
      });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      this.imageName = file.name;
      this.isUpload = true;

      const imageUrl = URL.createObjectURL(file);
      this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.store.dispatch(
          loadTrainerImageSuccess({ image: base64Image, name: this.imageName })
        );
      };
      reader.readAsDataURL(file);
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
