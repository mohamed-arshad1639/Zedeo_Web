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

  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public defaultFilter: any;
  public active = 1;
  varrients=[]
  images=[]
  varrientimages:any=[]
  size:any
  pcolor:any
  name:any
  offerPercentage:any
  offerPrize:any
  prize:any
  args={}
  varientmodel=[]
  selectedSize:any

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService) {
      debugger
    this.route.data.subscribe(response => this.product = response.data);
    console.log("product in Single psge", this.product);

  }

 



  ngOnInit(): void {

    debugger
    this.varrients=this.product.variants
    this.name=this.varrients[0].Name
    this.offerPercentage='5'
    console.log("product in Single psge", this.product);
    // this.varientmodel=this.varrients[0].variantValues
    this.varientmodel=this.varrients[0].variantValues
    console.log("varientmodel",this.varientmodel);
    console.log("varients123456789",this.varrients);
    this.images=this.varrients[0].image
    console.log("image12345678",this.images);
    // this.size=this.varrients[0].variantValues[1].value
    // this.pcolor=this.varrients[0].variantValues[0].value
    this.selectSize(this.size)
    let defaultValues = this.product.variantsModel.map((variant) => {
      let defaultValue =this.varrients[0].variantValues.find(
        (value) => value.name === variant
        
      );
      return defaultValue ? defaultValue.value : null;
    });
    this.changeValues(defaultValues)
   
    
  }
  changeValues(values:any){
    debugger
    console.log("size",values);
    // let ab=this.varrients.find(variant => variant.variantValues[0].value === this.pcolor && variant.variantValues[1].value === this.size);
   
    let ab = this.varrients.find(variant => {
      let valuesArr = variant.variantValues.map(v => v.value);
      return valuesArr.every((val, i) => val === values[i]);
    });
    this.images=ab.image
    this.name=ab.Name
    this.offerPrize=ab.offer
    this.prize=ab.price
    this.args={
      offer:this.offerPrize,
      price:this.prize
    }
    console.log(" this.images", this.images);
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].variantValues[0].value) === -1 && variants[i].variantValues[0].value) {
        uniqColor.push(variants[i].variantValues[0].value)
        // this.varrientimages.push(variants[i].image[0].url)
        // console.log("this.varrientimages",this.varrientimages);
        

      }
    }
    return uniqColor
  }

  // Get Product Size
  filterVarients(variants,index:any) {
    debugger 
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length ; i++) {
      if (uniqSize.indexOf(variants[i].variantValues[index].value) === -1 && variants[i].variantValues[index].value) {
        uniqSize.push(variants[i].variantValues[index].value)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    
   }

  // Increament
  increment() {
    console.log("product in Single psge", this.product);
    
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





// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../shared/data/slider';
// import { Product } from '../../../shared/classes/product';
// import { ProductService } from '../../../shared/services/product.service';
// import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";

// @Component({
//   selector: 'app-three-column',
//   templateUrl: './three-column.component.html',
//   styleUrls: ['./three-column.component.scss']
// })
// export class ThreeColumnComponent implements OnInit {

//   public product: Product = {};
//   public counter: number = 1;
//   public activeSlide: any = 0;
//   public selectedSize: any;
//   public active = 1;
//  public i=0;

//   @ViewChild("sizeChart") SizeChart: SizeModalComponent;

//   public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
//   public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

//   constructor(private route: ActivatedRoute, private router: Router,
//     public productService: ProductService) {
//     this.route.data.subscribe(response => this.product = response.data);
//   }

//   ngOnInit(): void {
//   }

//   // Get Product Color
//   Color(variants) {
//     const uniqColor = []
//     for (let i = 0; i < Object.keys(variants).length; i++) {
//       if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
//         uniqColor.push(variants[i].color)
//       }
//     }
//     return uniqColor
//   }

//   // Get Product Size
//   Size(variants) {
//     const uniqSize = []
//     for (let i = 0; i < Object.keys(variants).length; i++) {
//       if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
//         uniqSize.push(variants[i].size)
//       }
//     }
//     return uniqSize
//   }

//   selectSize(size) {
//     this.selectedSize = size;
//   }

//   // Increament
//   increment() {
//     this.counter++;
//   }

//   // Decrement
//   decrement() {
//     if (this.counter > 1) this.counter--;
//   }

//   // Add to cart
//   async addToCart(product: any) {
//     product.quantity = this.counter || 1;
//     const status = await this.productService.addToCart(product);
//     if (status)
//       this.router.navigate(['/shop/cart']);
//   }

//   // Buy Now
//   async buyNow(product: any) {
//     product.quantity = this.counter || 1;
//     const status = await this.productService.addToCart(product);
//     if (status)
//       this.router.navigate(['/shop/checkout']);
//   }

//   // Add to Wishlist
//   addToWishlist(product: any) {
//     this.productService.addToWishlist(product);
//   }

// }
