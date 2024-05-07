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
    this.currentUser$ = this.getKey('user');
   if(this.currentUser$.includes('admin')) {
    this.isAdmin = true;
   }
   this.userName = this.getKey('user');
  }


  login() {
    this.accountService.login(this.model).subscribe(res =>{
      if(res.success){
        if(res.data.userName == "admin") {
          this.isAdmin = true;
         }
         const now = new Date()

        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
          value: res.data.userName,
          expiry: now.getTime() + 5000,
        }
        localStorage.setItem('user', JSON.stringify(item))
        //localStorage.setItem('user',res.data.userName);
        this.userName = res.data.userName;
        this.currentUser$ = this.getKey("user");;
      }
    });
  }

  getKey(key:any) {
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
