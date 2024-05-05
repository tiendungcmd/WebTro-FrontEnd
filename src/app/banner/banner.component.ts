import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  isAdmin: boolean = false;
  ngOnInit(): void {
    var currentUser$ = localStorage.getItem('user');
    if (currentUser$?.includes('"userName":"admin"')) {
      this.isAdmin = true;
    }
  }
}
