import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
// import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-product-box-one',
  templateUrl: './product-box-one.component.html',
  styleUrls: ['./product-box-one.component.scss']
})
export class ProductBoxOneComponent implements OnInit {

  @Input() product;
  @Input() currency: any = this.productService.Currency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;
  public ImageSrc : string
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    if(this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
      console.log("productoneee",this.product);
      console.log("image",this.product.variants[0].image[0].url);
      
    }
  }


  // {
  //   "_id": "63a1f068c1eacf3d2700208f",
  //   "category": "Fashion",
  //   "subCategory": "Mens",
  //   "feature": [
  //     {
  //       "item": "brand",
  //       "value": "U.S.P"
  //     }
  //   ],
  //   "variants": [
  //     {
  //       "Name": "yellow",
  //       "color": "balck",
  //       "size": "M",
  //       "image": [
  //         {
  //           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1671557026/Banner/bgwfydlkbeejdposnjg0.jpg",
  //           "public_id": "Banner/bgwfydlkbeejdposnjg0"
  //         }
  //       ]
  //     }
  //   ],
  //   "variantsModel": [
  //     "color",
  //     "size"
  //   ],
  //   "id": 100
  // }


  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }
  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        })
      }
    })
  }
  // Change Variants Image
  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }

}
