import { Component } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {};
  currentUser$: any;
  isAdmin:boolean = false;
  userName:string |any;
  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.currentUser$ = localStorage.getItem('user');
   if(this.currentUser$.includes('admin')) {
    this.isAdmin = true;
   }
   this.userName = localStorage.getItem('user');
  }

  login() {
    this.accountService.login(this.model).subscribe(res =>{
      if(res.success){
        if(res.data.userName == "admin") {
          this.isAdmin = true;
         }
        localStorage.setItem('user',res.data.userName);
        this.userName = res.data.userName;
        this.currentUser$ = localStorage.getItem('user');;
      }
    });


  }

  logout() {
    this.currentUser$ = null;
    this.isAdmin = false;
    localStorage.removeItem('user');
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  trangCaNhan(){
    this.router.navigateByUrl('trang-ca-nhan')
  }
  baiDang(){
    this.router.navigateByUrl('quan-ly')
  }
}
