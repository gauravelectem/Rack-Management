
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Menu } from './models/menu.model';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response:any;
  itemPk:any;
  itemObject:any;
  dataObject:any;
  menuObject:any;

  menu: Menu = {
    label: '',
    action: '',
    menu_fk: '',
    roleId: '',
    itemId: '',
  };

constructor(private menuService: MenuService,
  private itemService:ItemService,
  private activatedRoute: ActivatedRoute) { } 

  ngOnInit(): void {  
    this.itemPk = this.activatedRoute.snapshot.params['id'];
    this.fetchItemById(this.itemPk);
  }

   fetchItemById(itemId:any) {
    this.itemService.getItemById(itemId)
      .subscribe(
        data => {
          this.itemObject = data;
          this.createMenu(this.menu);
        },
        error => {
          console.log(error);
        });
      }

  createMenu(menu:any): void {
    const data = {
      label: this.itemObject.name,
      action:"editProduct/"+this.itemObject.name+"/"+this.itemObject.id,
      menu_fk:1,
      roleId:2,
      itemId:this.itemObject.id,
    };

    this.menuService.createMenu(data)
      .subscribe(
        data => {
          this.dataObject = data;
          this.getMenuByItemId(this.dataObject.itemId);
        },
        error => {
          console.log(error);
        });
  }

  getMenuByItemId(itemId:any) {
    this.menuService.getMenuByItemId(itemId)
      .subscribe(
        data => {
          this.menuObject = data;
          console.log(this.menuObject);
        },
        error => {
          console.log(error);
        });
      }

}
