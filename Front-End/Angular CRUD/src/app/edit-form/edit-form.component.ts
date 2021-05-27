import {
    Component,
    OnInit
} from '@angular/core';
import swal from 'sweetalert2';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Formdata } from 'src/app/models/form-builder.model';

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
    model: Formdata = {
        name: '',
        description: '',
        attributes: [],
      };

    success = false;
    constructor(private tutorialService: TutorialService,
        private route: ActivatedRoute,
        private router: Router) {}

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


    submit(){
        let valid = true;
        let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
        validationArray.reverse().forEach(field => {
          console.log(field.label+'=>'+field.required+"=>"+field.value);
          if(field.required && !field.value && field.type != 'checkbox'){
            swal('Error','Please enter '+field.label,'error');
            valid = false;
            return false;
          }
          if(field.required && field.regex){
            let regex = new RegExp(field.regex);
            if(regex.test(field.value) == false){
              swal('Error',field.errorText,'error');
              valid = false;
              return false;
            }
          }
          if(field.required && field.type == 'checkbox'){
            if(field.values.filter(r=>r.selected).length == 0){
              swal('Error','Please enterrr '+field.label,'error');
              valid = false;
              return false;
            }
    
          }
        });
        if(!valid){
          return false;
        }
        console.log('Save',this.model);
        let input = new FormData;
        input.append('formId',this.model.id);
        input.append('attributes',JSON.stringify(this.model.attributes))
        // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
        //   console.log(r);
        //   swal('Success','You have contact sucessfully','success');
        //   this.success = true;
        // },error=>{
        //   swal('Error',error.message,'error');
        // });
       const data = {
          name: this.model.name,
          description: this.model.description,
          attributes: this.model.attributes
        };
    
        this.tutorialService.updateForm(this.model.id, this.model)
          .subscribe(
            response => {
              console.log(response);
             // this.submitted = true;
            },
            error => {
              console.log(error);
            });
      }

}