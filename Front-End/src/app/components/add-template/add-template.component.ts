import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/template.model';
import { FormService } from 'src/app/services/app.form.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTemplateComponent implements OnInit {
  tutorial: Tutorial = {
    name: '',
    subscriberId: '',
  };
  submitted = false;

  constructor(private tutorialService: FormService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      name: this.tutorial.name,
      subscriberId: this.tutorial.subscriberId
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      name: '',
      subscriberId: '',
    };
  }

}
