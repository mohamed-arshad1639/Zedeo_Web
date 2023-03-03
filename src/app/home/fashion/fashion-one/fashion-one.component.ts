import { Component, OnInit } from '@angular/core';
import { ProductSlider,CategorySlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { HomepageService } from 'src/app/shared/services/homepage.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


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
  categories:any
  images:any
  responsiveOptions;

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

    //get banner data
    this.getBannerData()
    //get categoryData
    this.getCategoryData()

    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 4
  }];
  }

  public ProductSliderConfig: any = ProductSlider;
  public CategorySliderConfig:any  = CategorySlider;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    navSpeed: 6000,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items:1,
      },
      600: {
        items:3 ,
      },
      1000: {
        items: 6,
      },
    },
  };

 

 
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
  }

  getCategoryData(){
    this.homePageService.getCategories().subscribe({
      next: (data) => {
        this.categories=data
        console.log("categories",this.categories);
        
        console.log("sliderss sucecss",data);
        console.log("sliderss",this.sliders);
      },
      error: (err) => {
        console.log("sliderss err data", err);
        // this.errorMessage = err.error;
        // this.toastr.error("", this.errorMessage);
      },
    });     

    

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
