import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  defaultImage: string = 'assets/img2.avif'; // Path to your default image
  imageSrc: string | ArrayBuffer | null = this.defaultImage;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }

  }

  selectedOption: string = '';
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

  addOption(newOption: string) {
    if (newOption) {
      this.options.push({ id: this.options.length + 1, name: newOption });
    }
  }
  ngOnInit(): void {
  }

}
