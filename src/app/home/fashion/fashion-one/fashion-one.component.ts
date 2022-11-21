import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { HomepageService } from 'src/app/shared/services/homepage.service';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];
  public active;
  sliders:any

  constructor(public productService: ProductService ,private homePageService:HomepageService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });

    this.getBannerData()
  }

  public ProductSliderConfig: any = ProductSlider;

  

 
  getBannerData(){
     this.homePageService.getHomeSlider().subscribe({
      next: (data) => {
        this.sliders=data
        console.log("sliderss sucecss",data);
        console.log("sliderss",this.sliders);
      },
      error: (err) => {
        console.log("sliderss err data", err);
        // this.errorMessage = err.error;
        // this.toastr.error("", this.errorMessage);
      },
    });
    // ID
    // : 
    // "PRO_ID10001"
    // image
    // : 
    // "http://res.cloudinary.com/dfx1wpxqz/image/upload/v1668794841/Banner/ilidldghq00lrndhnr3x.jpg"
    // subTitle
    // : 
    // "New Poducts"
    // title
    // : 
    // "New Collection"
    // _id
    // : 
    // "6377c9df8a0a5c5ad6fc6c1a"

     
  }

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  },
  
];

// collectiobanner with divident

collections2=[{
  image: 'assets/images/collection/fashion/1.jpg',
  save: 'save 50%',
  title: 'men'
}, {
  image: 'assets/images/collection/fashion/2.jpg',
  save: 'save 50%',
  title: 'women'
},
{
  image: 'assets/images/collection/fashion/2.jpg',
  save: 'save 50%',
  title: 'women'
},

];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
