import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  selectedCategoryId: string = '';
  selectedProductId: string = '';
  selectedFile: File | null = null;
  responseKeys: string[] = [];
  responseData: any = { 
    
      "Brand": "Acer",
      "Screen Size": "15.6 inches",
      "Color": "Silver",
      "HardDisk Size": "Undefined",
      "CPU Model": "Undefined",
      "About ITEM": {
          "1": "Nice product easy to use",
          "2": "New launch with modern design",
          "3": "Lightweight and portable",
          "4": "High-definition display for clear visuals",
          "5": "Suitable for both work and entertainment",
          "6": "Comes with pre-installed operating system",
          "7": "Good battery life for extended usage"
      }
  
};

  defaultImage: string = 'assets/img2.avif'; // Path to your default image
  imageSrc: string | ArrayBuffer | null = this.defaultImage;

  constructor(private dataService: UserDataService) {}

  ngOnInit() {
    this.loadCategories();
    this.responseKeys = Object.keys(this.responseData);

    this.responseKeys = Object.keys(this.responseData);
    // console.log("this.responseKeys",this.responseKeys);
    
  }

  loadCategories() {
    this.dataService.getCategories().subscribe((success: any) => {
      this.categories = success.result.data;
    });
  }

  onCategoryChange() {
    if (this.selectedCategoryId) {
      this.dataService
        .getProductsByCategory(this.selectedCategoryId)
        .subscribe((success: any) => {
          this.products = success.result.data;
        });
    } else {
      this.products = [];
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('categoryId', this.selectedCategoryId);
      formData.append('productId', this.selectedProductId);
      formData.append('image', this.selectedFile);

      this.dataService.submitData(formData).subscribe(
        (response) => {
          // console.log('Data submitted successfully', response);
          this.responseData = response;
          this.responseKeys = Object.keys(this.responseData);
          // console.log('responseData', this.responseData);

          // Reset form after submission
          form.resetForm();
          this.imageSrc = this.defaultImage;
        },
        (error) => {
          console.error('Error submitting data', error);
        }
      );
    }
  }
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

 


  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
