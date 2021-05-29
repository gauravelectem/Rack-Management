import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class ProductListComponent implements OnInit {
  products?: Product[];
  currentTutorial?: Product;
  currentIndex = -1;
  name = '';
  constructor(private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.tutorialService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Product, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;

    this.tutorialService.findByFormsName(this.name)
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  deleteProduct(id): void {
    this.tutorialService.deleteProduct(id)
      .subscribe(
        response => {
          console.log(response);
          this.tutorialService.getAll();
          this.router.navigate(['/tutorials']);
         
        },
        error => {
          console.log(error);
        });
  }

}
