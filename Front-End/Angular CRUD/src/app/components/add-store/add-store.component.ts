import { Store } from './../../models/store.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
  store: Store = {
    storeName: '',
    location: '',
    isAvaliable:false,
  };
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    
  }

}
