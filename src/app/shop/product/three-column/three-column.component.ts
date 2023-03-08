import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";

@Component({
  selector: 'app-three-column',
  templateUrl: './three-column.component.html',
  styleUrls: ['./three-column.component.scss']
})
export class ThreeColumnComponent implements OnInit {

  public product: any;
  public products=[]
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public active = 1;
  public id: string;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService) {
    // this.route.data.subscribe(response =>
    //   console.log("responsesinglr",response)
      
    //   //  this.product = response.data
    //   );
    this.route.queryParams.subscribe(params => {
      console.log("paramssingle",params);
      this.id = params.id ? params.id : null;
      console.log("category",this.id);
        // Category Filter
        this.productService.getProducts.subscribe(response => {  
          console.log("responseAll",response);    
          // Category Filter
          this.products=response
          if(params.category)
            this.products = this.products.filter(item => item.id == this.id);
            console.log("this.category",this.id);
            console.log("this.products",this.products);
          // Price Filter
          // this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice) 
          // Paginate Products
          // this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
          // this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
        })
        
      })
    }


  ngOnInit(): void {
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

}
