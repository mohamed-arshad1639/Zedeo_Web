import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../shared/data/slider";
import { Product } from "../../../shared/classes/product";
import { ProductService } from "../../../shared/services/product.service";
import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";

@Component({
  selector: "app-three-column",
  templateUrl: "./three-column.component.html",
  styleUrls: ["./three-column.component.scss"],
})
export class ThreeColumnComponent implements OnInit {
  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public defaultFilter: any;
  public active = 1;
  varrients = [];
  images = [];
  varrientimages: any = [];
  size: any;
  pcolor: any;
  name: any;
  offerPercentage: any;
  offerPrize: any;
  prize: any;
  args = {};
  varientmodel = [];
  cartProduct:any
  selectedSize: any;
  ProductCart:any
  curStock:any

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService
  ) {
    debugger;
    this.route.data.subscribe((response) => (this.product = response.data));
    console.log("product in Single psge", this.product);
  }

  ngOnInit(): void {
    this.varrients = this.product.variants;
    this.name = this.varrients[0].Name;
    this.offerPercentage = "5";
    console.log("product in Single psge", this.product);
    this.varientmodel = this.varrients[0].variantValues;
    this.images = this.varrients[0].image;
    this.curStock=this.varrients[0].stock
    this.ProductIntoCart()

    this.selectSize(this.size);
    let defaultValues = this.product.variantsModel.map((variant) => {
      let defaultValue = this.varrients[0].variantValues.find(
        (value) => value.name === variant
      );
      return defaultValue ? defaultValue.value : null;
    });
    // this.changeValues(defaultValues)
  }
  changeValues(values: any) {
    console.log("varientModel", this.varientmodel);
    const redVariants = this.varrients.filter((variant) =>
      variant.variantValues.some(
        (variantValue) => variantValue.value === values
      )
    );
    if (redVariants.length == 1) {
      const data = redVariants;
      this.varientmodel = redVariants[0].variantValues;
      this.images = data[0].image;
      this.name = data[0].Name;
      this.offerPrize = data[0].offer;
      this.prize = data[0].price;
      this.args = {
        offer: this.offerPrize,
        price: this.prize,
      };
    } else {
      const data = redVariants.filter((variant) =>
        variant.variantValues.some((value) =>
          this.varientmodel.some(
            (model) => model.name === value.name && model.value === value.value
          )
        )
      );
      

      console.log("data into cart", data);
      this.ProductCart.variants=[]
     
      console.log(" this.ProductCart", this.ProductCart);
      
      this.varientmodel = data[0].variantValues;
      this.images = data[0].image;
      this.name = data[0].Name;
      this.offerPrize = data[0].offer;
      this.prize = data[0].price;
      this.args = {
        offer: this.offerPrize,
        price: this.prize,
      };
      this.curStock=data[0].stock

      this.ProductCart.variants=data

      console.log(" this.images", this.images);
    }
    console.log("redVariants", redVariants);
  }


  // Get Product Size

  filterVarients(variants, index: any) {
    const uniqSize = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (
        uniqSize.indexOf(variants[i].variantValues[index].value) === -1 &&
        variants[i].variantValues[index].value
      ) {
        uniqSize.push(variants[i].variantValues[index].value);
      }
    }
    return uniqSize;
  }

  selectSize(size) {}

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
    console.log("(this.ProductCart",product);
    
    if (status) this.router.navigate(["/shop/cart"]);
  }

  // Buy Now

  async buyNow(product: any) {
    
    debugger

    console.log("this.counter",this.counter);
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(this.ProductCart);
    if (status) this.router.navigate(["/shop/checkout"]);
  }

  // Add to Wishlist

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  ProductIntoCart() {

    debugger
  
    // Create a copy of the product object
    this.ProductCart = { ...this.product };
  
    // Create a copy of the variants array and splice all but the first variant
    this.ProductCart.variants = [this.ProductCart.variants[0]];
    this.ProductCart.quantity = this.counter || 1
  
    console.log("this.product", this.product, "this.ProductCart", this.ProductCart);
  }
}


// {
//   "_id": "6423c1e143a6b2322085904d",
//   "productName": "Apple iPhone 14",
//   "category": "Phones",
//   "subCategory": "iPhone",
//   "description": "Brand: \tApple\nModel Name: \tiPhone 14\nNetwork Service Provider:\tUnlocked for All Carriers\nOperating System:\tiOS 16\nCellular Technology: \t5G\n\n15.40 cm (6.1-inch) Super Retina XDR display\nAdvanced camera system for better photos in any light\nCinematic mode now in 4K Dolby Vision up to 30 fps\nAction mode for smooth, steady, handheld videos\nVital safety technology — Crash Detection calls for help when you can’t",
//   "feature": [
//     {
//       "item": "..",
//       "value": ".."
//     }
//   ],
//   "variants": [
//     {
//       "variantsID": 1,
//       "Name": "(128 GB) - Yellow",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "128 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Yellow"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064620/Banner/laellowmh8jlxaa9wqcl.jpg",
//           "public_id": "Banner/laellowmh8jlxaa9wqcl"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064632/Banner/ktmz3kprcaqabnb5h3kj.jpg",
//           "public_id": "Banner/ktmz3kprcaqabnb5h3kj"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064633/Banner/thvhj69ab7umpsoqj14z.jpg",
//           "public_id": "Banner/thvhj69ab7umpsoqj14z"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064635/Banner/csfslqbltqpfb0jcjqer.jpg",
//           "public_id": "Banner/csfslqbltqpfb0jcjqer"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064636/Banner/shpjygdxkgpjijlvnisy.jpg",
//           "public_id": "Banner/shpjygdxkgpjijlvnisy"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064641/Banner/ockwomllg2fclai5syki.jpg",
//           "public_id": "Banner/ockwomllg2fclai5syki"
//         }
//       ],
//       "offer": 72999,
//       "price": 79999,
//       "stock": 8
//     },
//     {
//       "variantsID": 2,
//       "Name": "(256 GB) - Yellow",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "256 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Yellow"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064620/Banner/laellowmh8jlxaa9wqcl.jpg",
//           "public_id": "Banner/laellowmh8jlxaa9wqcl"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064632/Banner/ktmz3kprcaqabnb5h3kj.jpg",
//           "public_id": "Banner/ktmz3kprcaqabnb5h3kj"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064633/Banner/thvhj69ab7umpsoqj14z.jpg",
//           "public_id": "Banner/thvhj69ab7umpsoqj14z"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064635/Banner/csfslqbltqpfb0jcjqer.jpg",
//           "public_id": "Banner/csfslqbltqpfb0jcjqer"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064636/Banner/shpjygdxkgpjijlvnisy.jpg",
//           "public_id": "Banner/shpjygdxkgpjijlvnisy"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064641/Banner/ockwomllg2fclai5syki.jpg",
//           "public_id": "Banner/ockwomllg2fclai5syki"
//         }
//       ],
//       "offer": 82999,
//       "price": 89999,
//       "stock": 3
//     },
//     {
//       "variantsID": 3,
//       "Name": "(512 GB) - Yellow",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "512 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Yellow"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064620/Banner/laellowmh8jlxaa9wqcl.jpg",
//           "public_id": "Banner/laellowmh8jlxaa9wqcl"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064632/Banner/ktmz3kprcaqabnb5h3kj.jpg",
//           "public_id": "Banner/ktmz3kprcaqabnb5h3kj"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064633/Banner/thvhj69ab7umpsoqj14z.jpg",
//           "public_id": "Banner/thvhj69ab7umpsoqj14z"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064635/Banner/csfslqbltqpfb0jcjqer.jpg",
//           "public_id": "Banner/csfslqbltqpfb0jcjqer"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064636/Banner/shpjygdxkgpjijlvnisy.jpg",
//           "public_id": "Banner/shpjygdxkgpjijlvnisy"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064641/Banner/ockwomllg2fclai5syki.jpg",
//           "public_id": "Banner/ockwomllg2fclai5syki"
//         }
//       ],
//       "offer": 92999,
//       "price": 99999,
//       "stock": 5
//     },
//     {
//       "variantsID": 4,
//       "Name": "(128 GB) - RED",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "128 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Red"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064793/Banner/bqncdly2gpo8xjjnws8i.jpg",
//           "public_id": "Banner/bqncdly2gpo8xjjnws8i"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064805/Banner/tzcqg2psjg9xvsimviep.jpg",
//           "public_id": "Banner/tzcqg2psjg9xvsimviep"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/taqqq4289lgchp0f7myi.jpg",
//           "public_id": "Banner/taqqq4289lgchp0f7myi"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/ojwxwtanbciozhknrxkg.jpg",
//           "public_id": "Banner/ojwxwtanbciozhknrxkg"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/strlbkcbkyskmpijdoka.jpg",
//           "public_id": "Banner/strlbkcbkyskmpijdoka"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064812/Banner/idoagkcmdaheimhokdih.jpg",
//           "public_id": "Banner/idoagkcmdaheimhokdih"
//         }
//       ],
//       "offer": 71999,
//       "price": 79999,
//       "stock": 3
//     },
//     {
//       "variantsID": 5,
//       "Name": "(256 GB) - RED",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "256 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Red"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064793/Banner/bqncdly2gpo8xjjnws8i.jpg",
//           "public_id": "Banner/bqncdly2gpo8xjjnws8i"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064805/Banner/tzcqg2psjg9xvsimviep.jpg",
//           "public_id": "Banner/tzcqg2psjg9xvsimviep"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/taqqq4289lgchp0f7myi.jpg",
//           "public_id": "Banner/taqqq4289lgchp0f7myi"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/ojwxwtanbciozhknrxkg.jpg",
//           "public_id": "Banner/ojwxwtanbciozhknrxkg"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/strlbkcbkyskmpijdoka.jpg",
//           "public_id": "Banner/strlbkcbkyskmpijdoka"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064812/Banner/idoagkcmdaheimhokdih.jpg",
//           "public_id": "Banner/idoagkcmdaheimhokdih"
//         }
//       ],
//       "offer": 81999,
//       "price": 89999,
//       "stock": 1
//     },
//     {
//       "variantsID": 6,
//       "Name": "(512 GB) - RED",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "512 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Red"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064793/Banner/bqncdly2gpo8xjjnws8i.jpg",
//           "public_id": "Banner/bqncdly2gpo8xjjnws8i"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064805/Banner/tzcqg2psjg9xvsimviep.jpg",
//           "public_id": "Banner/tzcqg2psjg9xvsimviep"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/taqqq4289lgchp0f7myi.jpg",
//           "public_id": "Banner/taqqq4289lgchp0f7myi"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/ojwxwtanbciozhknrxkg.jpg",
//           "public_id": "Banner/ojwxwtanbciozhknrxkg"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064807/Banner/strlbkcbkyskmpijdoka.jpg",
//           "public_id": "Banner/strlbkcbkyskmpijdoka"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064812/Banner/idoagkcmdaheimhokdih.jpg",
//           "public_id": "Banner/idoagkcmdaheimhokdih"
//         }
//       ],
//       "offer": 91999,
//       "price": 99999,
//       "stock": 10
//     },
//     {
//       "variantsID": 7,
//       "Name": "(128 GB) - Purple",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "128 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Purple"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064928/Banner/wkp7u0yuj6rr5ejattuc.jpg",
//           "public_id": "Banner/wkp7u0yuj6rr5ejattuc"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064935/Banner/gvo33vfbph25drwtoivn.jpg",
//           "public_id": "Banner/gvo33vfbph25drwtoivn"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064936/Banner/bnv1pdxwwa9vujc21z9b.jpg",
//           "public_id": "Banner/bnv1pdxwwa9vujc21z9b"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064936/Banner/chr3ir3crucavp1eptx1.jpg",
//           "public_id": "Banner/chr3ir3crucavp1eptx1"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064937/Banner/sgevuxopnsb468qpzk8f.jpg",
//           "public_id": "Banner/sgevuxopnsb468qpzk8f"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064941/Banner/rqkyxydcgrwo3eugnxzg.jpg",
//           "public_id": "Banner/rqkyxydcgrwo3eugnxzg"
//         }
//       ],
//       "offer": 81999,
//       "price": 89999,
//       "stock": 2
//     },
//     {
//       "variantsID": 8,
//       "Name": "(256 GB) - Purple",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "256 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Purple"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064928/Banner/wkp7u0yuj6rr5ejattuc.jpg",
//           "public_id": "Banner/wkp7u0yuj6rr5ejattuc"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064935/Banner/gvo33vfbph25drwtoivn.jpg",
//           "public_id": "Banner/gvo33vfbph25drwtoivn"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064936/Banner/bnv1pdxwwa9vujc21z9b.jpg",
//           "public_id": "Banner/bnv1pdxwwa9vujc21z9b"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064936/Banner/chr3ir3crucavp1eptx1.jpg",
//           "public_id": "Banner/chr3ir3crucavp1eptx1"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064937/Banner/sgevuxopnsb468qpzk8f.jpg",
//           "public_id": "Banner/sgevuxopnsb468qpzk8f"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064941/Banner/rqkyxydcgrwo3eugnxzg.jpg",
//           "public_id": "Banner/rqkyxydcgrwo3eugnxzg"
//         }
//       ],
//       "offer": 91999,
//       "price": 99999,
//       "stock": 5
//     },
//     {
//       "variantsID": 9,
//       "Name": "(512 GB) - Purple",
//       "variantValues": [
//         {
//           "name": "ROM",
//           "value": "512 GB"
//         },
//         {
//           "name": "Color",
//           "value": "Purple"
//         }
//       ],
//       "image": [
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064928/Banner/wkp7u0yuj6rr5ejattuc.jpg",
//           "public_id": "Banner/wkp7u0yuj6rr5ejattuc"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064935/Banner/gvo33vfbph25drwtoivn.jpg",
//           "public_id": "Banner/gvo33vfbph25drwtoivn"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064936/Banner/bnv1pdxwwa9vujc21z9b.jpg",
//           "public_id": "Banner/bnv1pdxwwa9vujc21z9b"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064936/Banner/chr3ir3crucavp1eptx1.jpg",
//           "public_id": "Banner/chr3ir3crucavp1eptx1"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064937/Banner/sgevuxopnsb468qpzk8f.jpg",
//           "public_id": "Banner/sgevuxopnsb468qpzk8f"
//         },
//         {
//           "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1680064941/Banner/rqkyxydcgrwo3eugnxzg.jpg",
//           "public_id": "Banner/rqkyxydcgrwo3eugnxzg"
//         }
//       ],
//       "offer": 101999,
//       "price": 110999,
//       "stock": 3
//     }
//   ],
//   "variantsModel": [
//     "ROM",
//     "Color"
//   ],
//   "stockManagement": true,
//   "hidden": false,
//   "id": 100
// }

