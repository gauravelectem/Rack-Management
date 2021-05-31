import { Component } from '@angular/core';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 11 Crud';

  menuData:any;

  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    var roleId=1;
    this.getRoleById(roleId);
    //this.fetchAllMenus();
  }
  getRoleById(id:any): void {
    this.menuService.getRoleById(id)
      .subscribe(
        data => {
          this.menuData = data;
        },
        error => {
          console.log(error);
        });
  }

  fetchAllMenus(): void {
    this.menuService.fetchAllMenus()
      .subscribe(
        data => {
          this.menuData = data;
        },
        error => {
          console.log(error);
        });
  }
}
