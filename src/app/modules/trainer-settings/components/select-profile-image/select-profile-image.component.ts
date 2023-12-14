import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-select-profile-image',
  templateUrl: './select-profile-image.component.html',
  styleUrls: ['./select-profile-image.component.scss'],
})
export class SelectProfileImageComponent {
  selectedImage: SafeUrl | null = 'assets/svg/user.svg';
  imageName?: string = '';
  isUpload = false;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      this.imageName = file.name;
      this.isUpload = true;

      const imageUrl = URL.createObjectURL(file);
      this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    inputElement.value = '';
  }

  removeSelection() {
    this.selectedImage = 'assets/svg/user.svg';
    this.imageName = '';
    this.isUpload = false;
  }
}
