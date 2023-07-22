import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];

  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.products = response);
    console.log("this.products cart",this.products);

  
  }

  ngOnInit(): void {

  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);

  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

}


[
  {
    "_id": "63e7c6b8a4993f07d3bc105d",
    "productName": "Casual shirt for men",
    "category": "Shirts",
    "subCategory": "Allen Solly",
    "description": "aaa",
    "feature": [
      {
        "item": "Cloth Type",
        "value": "cotton"
      }
    ],
    "variants": [
      {
        "Name": "Gary M",
        "variantValues": [
          {
            "name": "Color",
            "value": "Gray"
          },
          {
            "name": "Size",
            "value": "M"
          }
        ],
        "image": [
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676133977/Banner/drdob7jvnfgmrnbkpout.png",
            "public_id": "Banner/drdob7jvnfgmrnbkpout"
          },
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676133982/Banner/mobxrayejmjiauuceswe.png",
            "public_id": "Banner/mobxrayejmjiauuceswe"
          }
        ],
        "offer": 4,
        "price": 37,
        "stock": 656,
        "variantsID": 1
      },
      {
        "Name": "Gary S",
        "variantValues": [
          {
            "name": "Color",
            "value": "white"
          },
          {
            "name": "Size",
            "value": "S"
          }
        ],
        "image": [
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676133977/Banner/drdob7jvnfgmrnbkpout.png",
            "public_id": "Banner/drdob7jvnfgmrnbkpout"
          },
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676133982/Banner/mobxrayejmjiauuceswe.png",
            "public_id": "Banner/mobxrayejmjiauuceswe"
          }
        ],
        "offer": 76,
        "price": 88,
        "stock": 8,
        "variantsID": 2
      },
      {
        "Name": "White M",
        "variantValues": [
          {
            "name": "Color",
            "value": "White"
          },
          {
            "name": "Size",
            "value": "M"
          }
        ],
        "image": [
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676134044/Banner/nlwwqnohsiiqu91uashd.png",
            "public_id": "Banner/nlwwqnohsiiqu91uashd"
          },
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676134051/Banner/zgii6faewenwmhrarwql.png",
            "public_id": "Banner/zgii6faewenwmhrarwql"
          }
        ],
        "offer": 6,
        "price": 67,
        "stock": 78,
        "variantsID": 3
      },
      {
        "Name": "White S",
        "variantValues": [
          {
            "name": "Color",
            "value": "white"
          },
          {
            "name": "Size",
            "value": "S"
          }
        ],
        "image": [
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676134044/Banner/nlwwqnohsiiqu91uashd.png",
            "public_id": "Banner/nlwwqnohsiiqu91uashd"
          },
          {
            "url": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676134051/Banner/zgii6faewenwmhrarwql.png",
            "public_id": "Banner/zgii6faewenwmhrarwql"
          }
        ],
        "offer": 67,
        "price": 7,
        "stock": 87,
        "variantsID": 4
      }
    ],
    "variantsModel": [
      "Color",
      "Size"
    ],
    "stockManagement": true,
    "hidden": false,
    "id": 100,
    "images": [
      {
        "src": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676133977/Banner/drdob7jvnfgmrnbkpout.png",
        "variant_id": [
          1
        ]
      },
      {
        "src": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676133977/Banner/drdob7jvnfgmrnbkpout.png",
        "variant_id": [
          2
        ]
      },
      {
        "src": "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1676134044/Banner/nlwwqnohsiiqu91uashd.png",
        "variant_id": [
          3
        ]
      }
    ],
    "quantity": 1
  }
]