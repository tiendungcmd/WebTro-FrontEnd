import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountService } from '../service/account.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService)
  const itemStr = localStorage.getItem('user')
  var user = null
  if (!itemStr) {
    toastr.error('Bạn cần đăng nhập trước!');
    return false;
  }
  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem('user')
    toastr.error('Bạn cần đăng nhập trước!');
    return false;
  }
  return true;
};

