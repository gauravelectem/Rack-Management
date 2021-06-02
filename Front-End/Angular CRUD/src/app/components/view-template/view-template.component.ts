import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/app.form.service';
import { Formdata } from 'src/app/models/form-builder.model';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {
  
  model: Formdata = {
    name: '',
    description: '',
    attributes: [],
  };
  success = false;
  constructor(private route: ActivatedRoute,
    private router: Router,private tutorialService: FormService) { }

  ngOnInit(): void {
    this.getFormData(this.route.snapshot.params.id);
  }

  getFormData(id: string): void {
    let datas ;
      this.tutorialService.get(id)
          .subscribe(
              data => {
                datas = data;
               datas.attributes = JSON.parse(datas.attributes);
                  this.model = datas;
                  //this.model = JSON.parse(this.model.attributes);
                  console.log(data);
              },
              error => {
                  console.log(error);
              });
  } 
  

}
