import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private accountService: AccountService, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    var currentUser = this.getKey('user');
    if (currentUser && !currentUser.includes('admin')) {
      this.accountService.getProfile(currentUser).subscribe(res => {
        this.profile = res.data;


        const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
        const formattedDate = formatter.format(res.data.birthDay);
        console.log(formattedDate);


        this.profile.birthDay = formattedDate;
        if (!res.data.isActive) {
          this.toastrService.error("Tài khoản của bạn bị khóa");
        }
      })
    }
  }

  getKey(key: any) {
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
  updateProfile() {
    this.profile.sex = parseInt(this.profile.sex);
    this.accountService.updateProfile(this.profile).subscribe(res => {
      if (res.success) {
        this.toastrService.success("Cập nhật thành công!");
        this.getUser();
      }
    })
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onSelected() {

  }
}
