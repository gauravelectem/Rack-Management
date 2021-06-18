import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/userProfile.model';
import { UploadFilesService } from '../../services/upload-files.service';
import { UserProfileService } from '../../services/user-profile.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  UserObj: any = {};
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  profile: Profile = {
    id:0,
    userName: '',
    email: '',
    address: '',
    city: '',
    image: '',
    phone:'',
    user_fk:0
  };
  constructor(private userProfile:UserProfileService,private route: ActivatedRoute,
    private uploadService: UploadFilesService) { }

  ngOnInit(): void {
    
      this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
      this.profile.user_fk = this.UserObj.clientFk; 
      this.fetchProfileObject(this.route.snapshot.params.id);
  }

  fetchProfileObject(id:any): any {
    this.userProfile.fetchProfileByUserFK(id)
      .subscribe(
        response => {
          this.profile=response;
        },
        error => {
          console.log(error);
        });
  }

  onSubmit() {   
     this.updateProfile()
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }

  updateProfile(): any {
    this.profile[0].img=this.currentFile.name;
    this.userProfile.updateProfile(this.profile[0].id,this.profile[0])
      .subscribe(
        response => {
          this.profile=response;
        },
        error => {
          console.log(error);
        });
  }

  

}
