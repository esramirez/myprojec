import { SafeUrl } from "@angular/platform-browser";


export class Product {
    id: number;
    name: string;
    description: string;
    imageUrl: SafeUrl;
    category: string;
    originalProject: Product;
    selected: boolean;
    postUrl: SafeUrl;
    
  
    constructor(obj?: any) {
      
      this.id = (obj && obj.id) || null;
      this.name = (obj && obj.name) || null;
      this.description = (obj && obj.description) || null;
      this.category = (obj && obj.category) || null;
      this.imageUrl = (obj && obj.imageUrl) || null;
      this.postUrl = (obj && obj.postUrl) || null;
    }
  }
  