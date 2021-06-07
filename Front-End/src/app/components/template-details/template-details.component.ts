import { FormService } from './../../services/app.form.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/template.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {
  currentTutorial: Tutorial = {
    name: '',
    subscriberId: '',
  };
  message = '';

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    let id = '';
    id = this.route.snapshot.params['id'];
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
    this.formService.get(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentTutorial.name,
      subscriberId: this.currentTutorial.subscriberId,
    };

    this.message = '';

    this.formService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {

          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial(): void {
    this.message = '';

    this.formService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.formService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }
}
