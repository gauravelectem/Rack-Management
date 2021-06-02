import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Menu } from './models/menu.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 11 Crud';
  response:any;
  private subscription: Subscription;

  menu: Menu = {
    label: '',
    action: '',
    menu_fk: '',
    roleId: '',
    itemId: '',
  };

  constructor(private menuService:MenuService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.subscription = activatedRoute.params.subscribe(
        (param: any) => this.response = JSON.parse(param['response'])
      );
    }

    
  ngOnDestroy() { 
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {  
    console.log(this.response);
    this.menu.label=this.response.description,
    this.menu.action=this.response.name,
    this.menu.menu_fk=1,
    this.menu.roleId=2
    this.menu.itemId=this.response.id;

     this.createMenu(this.menu);
  }

  createMenu(menu:any): void {
    const data = {
      label: this.menu.label,
      action: this.menu.action,
      menu_fk:menu.menu_fk,
      roleId:menu.roleId,
      itemId:this.menu.itemId
    };

    this.menuService.createMenu(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
