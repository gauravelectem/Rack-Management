import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '@app/service/store.service';
import * as store from 'src/assets/store.json';


@Component({
  selector: 'app-store-listing',
  templateUrl: './store-listing.component.html',
  styleUrls: ['./store-listing.component.less']
})
export class StoreListingComponent implements OnInit {

  stores: any = (store as any).default;

  storeList: any;

  constructor(private storeService: StoreService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

     this.fetchAllStores();
    //  this.createStore(this.store);
    //  this.updateStore(this.storeId,this.store);
    //  this.deleteStore(this.storeId);
  }

  reDirectToAddStorePage(){
    this.storeService.setStoreId(null);
    this.router.navigate(['/editStore'], {
      relativeTo: this.route
  });
  }

  redirectToEditStore(id: any){
    this.storeService.setStoreId(id);
    this.router.navigate(['/editStore'], {
      relativeTo: this.route
  });
  }

  fetchAllStores(){
    this.storeService.fetchAllStores()
            .subscribe((data) => {
                this.storeList = data;
            });
  }

  reDirectToEmployees(id: any){
    this.storeService.setStoreId(id);
    this.router.navigate(['/employees'], {
      relativeTo: this.route
  });
  }

  deleteStoreById(storeId: any){
    this.storeService.deleteStore(storeId)
    .subscribe((data) => {
        this.storeList = data;
        this.fetchAllStores();
    });

  }

  // createStore(store:any){
  //   this.storeService.createStore(store)
  //   .subscribe((data)=>{

  //     this.storeList=data;
  //     console.log(data);
  //   })
  // }

  // deleteStore(storeId:any){
  //   this.storeService.deleteStore(storeId)
  //   .subscribe((data)=>{

  //     this.storeList=data;
  //     console.log(data);
  //   })
  // }

  // updateStore(storeId:any,store:any){
  //   this.storeService.updateStore(storeId,store)
  //   .subscribe((data)=>{

  //     this.storeList=data;
  //     console.log(data);
  //   })
  // }


}
