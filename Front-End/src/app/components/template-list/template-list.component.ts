import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/template.model';
import { FormService } from 'src/app/services/app.form.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tutorials-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  name = '';
  UserObj : any = {};
  clientFk : '';

  constructor(private formService: FormService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.clientFk = this.UserObj.clientFk;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.formService.getAll(this.clientFk)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
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

    this.formService.findByTitle(this.name)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteTemplate(id): void {
    this.formService.delete(id)
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

  removeTemplate(id) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to remove this template?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.deleteTemplate(id)
      }
    });

  }

}
