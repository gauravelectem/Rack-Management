import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormService } from 'src/app/services/app.form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Formdata } from 'src/app/models/form-builder.model';

@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.css']
})
export class EditFormsComponent implements OnInit {

  model: Formdata = {
    name: '',
    description: '',
    attributes: [],
  };

success = false;
constructor(private formService: FormService,
    private route: ActivatedRoute,
    private router: Router) {}

ngOnInit(): void {
    this.getFormData(this.route.snapshot.params.id);
}

getFormData(id: string): void {
  let datas ;
    this.formService.getFormData(id)
        .subscribe(
            data => {
                datas = data;
                if (Array.isArray(datas.attributes)) {
                  this.model = datas;
                } else {
                  datas.attributes = JSON.parse(datas.attributes);
                  this.model = datas;
                }
            },
            error => {
                console.log(error);
            });
}

cancel() {
  this.router.navigate(['/products']);
        this.formService.getAllProducts();
}

submit() {
  let valid = true;
  const validationArray = JSON.parse(JSON.stringify(this.model.attributes));
  validationArray.reverse().forEach(field => {
    console.log(field.label + '=>' + field.required + '=>' + field.value);
    if (field.required && !field.value && field.type != 'checkbox') {
      swal('Error', 'Please enter ' + field.label, 'error');
      valid = false;
      return false;
    }
    if (field.required && field.regex) {
      const regex = new RegExp(field.regex);
      if (regex.test(field.value) == false) {
        swal('Error', field.errorText, 'error');
        valid = false;
        return false;
      }
    }
    if (field.required && field.type == 'checkbox') {
      if (field.values.filter(r => r.selected).length == 0) {
        swal('Error', 'Please enterrr ' + field.label, 'error');
        valid = false;
        return false;
      }

    }
  });
  if (!valid) {
    return false;
  }
  console.log('Save', this.model);
  const input = new FormData;
  input.append('formId', this.model.id);
  input.append('attributes', JSON.stringify(this.model.attributes));
 const data = {
    name: this.model.name,
    description: this.model.description,
    attributes: this.model.attributes
  };

  this.formService.updateProductForm(this.model.id, this.model)
    .subscribe(
      response => {
        console.log(response);
        this.success = true;
        this.router.navigate(['/products']);
        this.formService.getAllProducts();
      },
      error => {
        console.log(error);
      });
}

}
