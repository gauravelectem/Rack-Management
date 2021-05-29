import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuData:any;

  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    var roleId=1;
    this.getRoleById(roleId);
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

}
