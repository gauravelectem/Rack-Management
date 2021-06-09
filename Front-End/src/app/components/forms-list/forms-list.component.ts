import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/form.model';
import { FormService } from './../../services/app.form.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormListComponent implements OnInit {
  products?: Product[];
  currentTutorial?: Product;
  currentIndex = -1;
  name = '';
   tempid = '';
  clientFk = ''; 
  UserObj : any = {};
  templateName:any;
  constructor(private formService: FormService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.tempid = this.route.snapshot.params['id'];
    this.retrieveProducts();
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.clientFk = this.UserObj.clientFk;
  }

  retrieveProducts(): void {
    this.formService.getAllProductsByItemTempId(this.tempid, this.route.snapshot.params.name)
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
    this.formService.deleteAll()
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

    this.formService.findByFormsName(this.name)
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteFormData(id): void {
    this.formService.deleteFormData(id, this.route.snapshot.params.name)
      .subscribe(
        response => {
          console.log(response);
          this.formService.getAll(this.clientFk);
          this.router.navigate(['/template']);
        },
        error => {
          console.log(error);
        });
  }


  removeForm(id) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to remove this form?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.deleteFormData(id)
      }
    });

  }
  
  addNewForm(): void {
    this.router.navigate(['/addProduct/' + this.route.snapshot.params.name + '/' +this.tempid ]);
  }


}
