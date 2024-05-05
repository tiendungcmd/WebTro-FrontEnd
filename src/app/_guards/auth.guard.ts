import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountService } from '../service/account.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService)
  const user = localStorage.getItem('user');
  if(user) return true;
  else{
    toastr.error('Bạn cần đăng nhập trước!');
    return false;
  }
};
