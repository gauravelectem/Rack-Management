import { StoreService } from './../../services/store.service';
import { Store } from './../../models/store.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  storeList?: Store[];

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.retrieveAllStores();
  }

  retrieveAllStores(): void {
    this.storeService.getAll()
      .subscribe(
        data => {
          this.storeList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
