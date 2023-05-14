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
    this.varientmodel=this.varrients[0].variantValues
    this.images=this.varrients[0].image
    this.selectSize(this.size)
    let defaultValues = this.product.variantsModel.map((variant) => {
      let defaultValue =this.varrients[0].variantValues.find(
        (value) => value.name === variant
      );
      return defaultValue ? defaultValue.value : null;
    });
    // this.changeValues(defaultValues)
   
    
  }
  changeValues(values:any){
    console.log("values",values);
    // this.selectedSize=values
    console.log("varientModel",this.varientmodel);
    const redVariants =  this.varrients.filter(variant =>
      variant.variantValues.some(variantValue => variantValue.value === values)
    );
if(redVariants.length==1){
  const data=redVariants
  this.varientmodel=redVariants[0].variantValues
  this.images=data[0].image
  this.name=data[0].Name
  this.offerPrize=data[0].offer
  this.prize=data[0].price
  this.args={
      offer:this.offerPrize,
      price:this.prize
    }
}
else{

  const data =redVariants.filter((variant) =>
  variant.variantValues.some((value) =>
  this.varientmodel.some((model) =>
      model.name === value.name && model.value === value.value
    )
  )
);
console.log("data",data);
this.varientmodel=data[0].variantValues
this.images=data[0].image
this.name=data[0].Name
this.offerPrize=data[0].offer
this.prize=data[0].price
this.args={
      offer:this.offerPrize,
      price:this.prize
    }
console.log(" this.images", this.images);

}
console.log("redVariants",redVariants);
   
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
