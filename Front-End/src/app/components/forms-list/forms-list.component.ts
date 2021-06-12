import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/form.model';
import { FormService } from './../../services/app.form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormListComponent implements OnInit {
  products?: Product[];
  columnArray:any = [];
  currentTemplate?: Product;
  currentIndex = -1;
  name = '';
  tempid = '';
  clientFk = '';
  UserObj: any = {};
  templateName: any;
  columns:Array<any>
  displayedColumns: string[] = [];
  dataRow :any = [];
  //displayedColumns: string[] = ['select', 'age', 'athlete', 'year', 'country'];
  constructor(private formService: FormService,
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) { }
    dataSource = new MatTableDataSource<any>();
   // dataSource:any
  ngOnInit(): void {
    this.getData();
    this.tempid = this.route.snapshot.params['id'];
    //this.retrieveForms();
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.clientFk = this.UserObj.clientFk;
  }

  retrieveForms(): void {
    let datas;
    this.formService.getAllProductsByItemTempId(this.tempid, this.route.snapshot.params.name)
      .subscribe(
        data => {
          datas = data;
          this.products = datas;
          const columns = datas[0].attributes
          .reduce((columns, row) => {
            return [...columns, ...Object.keys(row)]
          }, [])
          .reduce((columns, column) => {
            return columns.includes(column)
              ? columns
              : [...columns, column]
          }, [])
        // Describe the columns for <mat-table>.
        this.columns = columns.map(column => {
          return { 
            columnDef: column,
            header: column,
            cell: (element: any) => `${element[column] ? element[column] : ``}`     
          }
        })
        this.displayedColumns = this.columns.map(c => c.columnDef);
              this.dataSource.data =  datas[0].attributes;
        });
  }

  refreshList(): void {
    this.retrieveForms();
    this.currentTemplate = undefined;
    this.currentIndex = -1;
  }

  setActiveTemplate(Template: Product, index: number): void {
    this.currentTemplate = Template;
    this.currentIndex = index;
  }

  removeAllTemplates(): void {
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
    this.currentTemplate = undefined;
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
        this.deleteFormData(id);
      }
    });

  }

  addNewForm(): void {
    this.router.navigate(['/addForm/' + this.route.snapshot.params.name + '/' + this.tempid ]);
  }

  private getData(): any {
    this.http.get('/assets/testdata/itemlisting.json')
    .subscribe((data: any) => {
      data.reverse().forEach(field => {
        console.log(field);
        this.columnArray.push({[field.label]:field.value});
       });
      const columns =  this.columnArray
      .reduce((columns, row) => {
        return [...columns, ...Object.keys(row)]
      }, [])
      .reduce((columns, column) => {
        return columns.includes(column)
          ? columns
          : [...columns, column]
      }, [])
    // Describe the columns for <mat-table>.
    this.columns = columns.map(column => {
      return { 
        columnDef: column,
        header: column,
        cell: (element: any) => `${element[column] ? element[column] : ``}`     
      }
    })
    this.displayedColumns = this.columns.map(c => c.columnDef);
    
          this.dataSource.data =  this.columnArray;
    });
    //// this.dataSource.data = <any> await this.http.get('https://www.ag-grid.com/example-assets/olympic-winners.json').toPromise();
  }

}
