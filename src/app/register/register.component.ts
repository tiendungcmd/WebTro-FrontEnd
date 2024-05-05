import { Component } from '@angular/core';
import { AccountService } from '../service/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 // @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router){}
  ngOnInit() : void{

  }

  register(){
    this.accountService.register(this.model).subscribe(res=>{
      if(res.success){
        localStorage.setItem('user', JSON.stringify(res.userName));
        this.toastr.success("Bạn đã đăng kí tài khoản thành công!")
        //this.router.navigateByUrl('/')
     //   window.location.reload();
      }else{
        this.toastr.success("Đăng kí thất bại!");
        localStorage.removeItem('user');9
      }
    })
  }

  cancel(){
  }
}
