
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
  itemPk:any;
  itemlabel:any;
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
  private activatedRoute: ActivatedRoute,
  private router: Router) { } 
  UserObj : any = {};
  ngOnInit(): void {  
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.itemPk = this.activatedRoute.snapshot.params['id'];
    //this.fetchItemById(this.itemPk);
    this.fetchAllmenus();
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
      action:"menu/"+this.itemObject.name+"/"+this.itemObject.id,
      menu_fk:1,
      roleId:1,
      itemId:this.itemObject.id,
    };

    this.menuService.createMenu(data)
      .subscribe(
        data => {
          this.dataObject = data;
          this.fetchAllmenus();
        },
        error => {
          console.log(error);
        });
  }

  
  fetchAllmenus() {
    this.menuService.fetchAllMenus()
      .subscribe(
        data => {
          this.menuObject = data;
        },
        error => {
          console.log(error);
        });
      }

      redirect(action : any) {
        this.router.navigate(['/action']);
      }

      logout() {
        window.sessionStorage.clear();
        this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
      }

    refreshPage(action) {
      this.router.navigate(['/' +action])
      .then(() => {
        window.location.reload();
      });
    }

}
