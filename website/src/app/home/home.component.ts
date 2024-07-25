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
  responseData: any = {};

newKey: string = '';
newValue: string = '';
keyValuePairs: any= [];
userKey: any= [];
// description: string = '';


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

  onSubmit() {
    if (this.selectedFile) {
      this.modifyFinalResponse()
      const formData = new FormData();
      formData.append('categoryId', this.selectedCategoryId);
      formData.append('productId', this.selectedProductId);
      formData.append('image', this.selectedFile);
      formData.append('userKey', this.userKey);
      // if (this.description) {
      //   formData.append('description', this.description);
      // }
      

      this.dataService.submitData(formData).subscribe(
        (response) => {
          this.responseData = response;
          this.responseKeys = Object.keys(this.responseData);
          this.resetForm();
          this.imageSrc = this.defaultImage;
        },
        (error) => {
          console.error('Error submitting data', error);
        }
      );
    }
  }

  resetForm() {
    this.selectedCategoryId = '';
    this.selectedProductId = '';
    this.selectedFile = null;
    this.userKey = '';
    // this.description = '';
    
  }
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

 


  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


  addKeyValuePair() {
    if (this.newKey && this.newValue) {
      this.keyValuePairs.push({ key: this.newKey, value: this.newValue });
      this.newKey = '';
      this.newValue = '';
    }
    console.log(this.keyValuePairs);
    
  }
    modifyFinalResponse(){
    let result=[]
    for(const item of this.keyValuePairs){
        result.push(`'${item.key}':'${item.value}'`)
    }
    this.userKey = result
}
}
