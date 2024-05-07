import { Component, OnInit } from '@angular/core';
import { MotelService } from '../../service/motel.service';
import { AccountService } from '../../service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quan-ly-tai-khoan',
  templateUrl: './quan-ly-tai-khoan.component.html',
  styleUrl: './quan-ly-tai-khoan.component.css'
})
export class QuanLyTaiKhoanComponent implements OnInit {
  users: any;
  constructor(private accountService: AccountService, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.accountService.getListUser().subscribe(res => {
      this.users = res.data;
    })
  }
  lockUser(id: any) {
    this.accountService.lockUser(id).subscribe(res => {
      if (res.success) {
        this.toastrService.success("Khoá thành công!");
        this.getUsers();
      }
    })
  }
  resetPw(id: any) {
    this.accountService.resetPassword(id).subscribe(res => {
      if (res.success) {
        this.toastrService.success("Reset mật khẩu thành công!");
        this.getUsers();
      }
    })
  }
}
