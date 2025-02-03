import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';

// const AUTH_API = 'http://18.208.225.35/';
const AUTH_API ='http://api.zedeoapp.com/';
// http://api.zedeoapp.com/api/user/login
// http://18.208.225.35/api/user/login

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public Currency = { name: 'Indian Rupee', currency: 'INR', price: 1 } // Default Currency 'INR':'symbol-narrow':'4.2-2'
  public OpenCart: boolean = false;
  public Products
  constructor(private http: HttpClient,
    private toastrService: ToastrService) { }
  /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */
  // assets/data/products.json
  private get products(): Observable<Product[]> {
    this.Products = this.http.get(AUTH_API+'api/user/main/view-all-products').pipe(map(data => data));
  console.log("this.Products_ALL",this.Products);
    this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  }

  // public CategorywiseProduct(category:any):Observable<Product[]>{
  //   this.Products = this.http.get<Product[]>(AUTH_API+`api/user/main/view-category-products/${category}`).pipe(map(data => data));
  //   this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
  //   return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  // }

  // Get Products
  public get getProducts(): Observable<Product[]> {
    return this.products;
  }

  // Get Products By Slug
  public getProductBySlug(slug: string): Observable<Product> { 
    debugger
    // this.Products = this.http.get<Product[]>(AUTH_API+`api/user/main/view-single-product/${slug}`).pipe(map(data => data));
    // this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    return this.products.pipe(map(items => { 
      console.log("itemspipe",items);
      
      return items.find((item: any) => { 
         console.log("itemfind",item);
         debugger
        console.log("slug",slug);
        debugger
        console.log(" item.title.replace", item._id);
        
        return item._id.replace(' ', '-') === slug; 
      }); 
    }));
  }


  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare Product  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.id === product.id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Cart
  public addToCart(product): any {

    debugger

    const cartItem = state.cart.find(item => item._id === product._id && item.variants[0].variantsID === product.variants[0].variantsID);
    const qty = product.quantity ? product.quantity : 1;
    const items = cartItem ? cartItem : product;
    const stock = this.calculateStockCounts(items, qty);
    
    if(!stock) return false

    if (cartItem) {
        cartItem.quantity += qty    
    } else {
      state.cart.push({
        ...product,
        quantity: qty
      })
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true;
  }

  // Update Cart Quantity
  public updateCartQuantity(product:any, quantity: number): Product | boolean {
    debugger
    return state.cart.find((items, index) => {
      if (items._id === product._id &&items.variants[0].variantsID === product.variants[0].variantsID) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

    // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.variants[0].stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      return false
    }
    return true
  }

  // Remove Cart items
  public removeCartItem(product: Product): any {
    const index = state.cart.indexOf(product);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true
  }

  // Total amount 
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: Product[]) => {
      return product.reduce((prev, curr: Product) => {
        let price = curr.price;
        if(curr.discount) {
          price = curr.price - (curr.price * curr.discount / 100)
        }
        return (prev + price * curr.quantity) * this.Currency.price;
      }, 0);
    }));
  }

  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  public filterProducts(filter: any): Observable<Product[]> {
    return this.products.pipe(map(product => 
      product.filter((item: Product) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags
          if (item.tags) {
            if (item.tags.includes(prev)) {
              return prev
            }
          }
        })
        return Tags
      })
    ));
  }

  // Sorting Filter
  public sortProducts(products: Product[], payload: string): any {

    if(payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    } 
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) { 
      currentPage = 1; 
    } else if (currentPage > totalPages) { 
      currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if(currentPage < paginateRange - 1){
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage =  currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
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
