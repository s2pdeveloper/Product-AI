import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
  keyValuePairs: { key: string, value: string }[] = [];
  selectedProduct: any = null;
  description: string = '';
  streamData: any[] = []; // Change to an array of strings
  defaultImage: string = 'assets/img2.avif'; // Path to your default image
  imageSrc: string | ArrayBuffer | null = this.defaultImage;
  
  // Property to store user input
  submittedKeyValuePairs: { key: string, value: string }[] = [];

  // Subject to handle streaming data line by line
  streamDataSubject = new BehaviorSubject<string[]>([]);
  streamData$ = this.streamDataSubject.asObservable();

  constructor(private dataService: UserDataService) {}

  ngOnInit() {
    this.loadCategories();
    this.responseKeys = Object.keys(this.streamData);
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

  onProductChange() {
    this.selectedProduct = this.products.find(product => product._id === this.selectedProductId);
    this.keyValuePairs = []; // Reset keyValuePairs when a new product is selected
    if (this.selectedProduct && this.selectedProduct.userKey) {
      this.keyValuePairs = this.selectedProduct.userKey.map((key: string) => ({ key, value: '' }));
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
    if (this.selectedFile && this.selectedProduct) {
      const formData = new FormData();
      formData.append('categoryId', this.selectedCategoryId);
      formData.append('productId', this.selectedProductId);
      formData.append('image', this.selectedFile);
      formData.append('description', this.description);
  
      const userKeyArray = this.keyValuePairs.map(pair => `${pair.key}:${pair.value}`);
      formData.append('userKey', JSON.stringify(userKeyArray));
  
      this.dataService.submitData(formData).subscribe(
        (event: any) => {
          if (event?.partialText) {
           console.log(event.partialText.split('\n'));
            this.streamData = event.partialText.split('\n'); // Split the partialText into lines
          }
          
          if (event.type === HttpEventType.Response) {
            this.handleStream(event.body as Blob);
          }
        },
        (error) => {
          console.error('Error submitting data', error);
        }
      );
    }
  }

  private async handleStream(blob: any) {
    const reader = blob.stream().getReader();
    const decoder = new TextDecoder();
    let streamData = '';
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      streamData += chunk;

      // Update the UI incrementally
      this.streamData = streamData.split('\n'); // Split the chunk into lines
      console.log('Stream Data:', this.streamData);
    }
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
