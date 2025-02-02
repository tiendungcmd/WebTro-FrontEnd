import { Component, OnInit } from '@angular/core';
import { MotelService } from '../../service/motel.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-dang-tin',
  templateUrl: './dang-tin.component.html',
  styleUrl: './dang-tin.component.css'
})
export class DangTinComponent implements OnInit {
  model: any = {};
  file: any;
  constructor(private motelService: MotelService,private toastrService: ToastrService,
     private router: Router,private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    var currentUser = this.getWithExpiry('user');
    if (currentUser && !currentUser.includes('admin')) {
      this.accountService.getProfile(currentUser).subscribe(res => {
        if(!res.data.isActive){
          this.toastrService.error("Tài khoản của bạn bị khóa không thể đăng bài!");
          this.router.navigateByUrl('/');
        }
      })
    }
  }

  createMotel() {
    this.model.file = this.file.File;
    this.model.status = 2; //pending
    this.model.price = 0;
    this.model.rate = 1;
    this.model.reason = "";
    this.model.userName = this.getWithExpiry('user');
    this.motelService.postMotel(this.model).subscribe(res => {
      console.log(res.data)
      if(res.success){
        this.toastrService.success("Tạo bài đăng thành công!")
        this.router.navigateByUrl('/')
      }
    })
  }
  getWithExpiry(key:any) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // const file = reader.result;

      this.file = {
        Name: file?.name,
        File: file,
        Type: url,
      }
    };
  }
}
export interface SelectedFiles {
  name: string
  base64?: string
  type?: string
}
