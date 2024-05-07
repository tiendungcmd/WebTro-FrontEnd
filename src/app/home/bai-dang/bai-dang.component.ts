import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MotelService } from '../../service/motel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bai-dang',
  templateUrl: './bai-dang.component.html',
  styleUrl: './bai-dang.component.css'
})
export class BaiDangComponent implements OnInit {
  id: any;
  motel: any;
  phone: any;
  hidePhone: string = '09***';
  hiddenPhone: boolean = true;
  comment: any = {};
  comments: any;
  isAdmin: boolean = false;
  constructor(private route: ActivatedRoute, private motelService: MotelService, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id);
    this.motelService.getMotelById(this.id).subscribe(res => {
      if (res.success) {
        this.motel = res.data;
        this.phone = res.data.userPhone;
      }
    });

    this.getComment();

    var currentUser$ = this.getKey('user');
    if (currentUser$ && currentUser$.includes('admin')) {
      this.isAdmin = true;
    }
  }

  showPhone() {
    this.hidePhone = this.phone;
    this.hiddenPhone = false;
  }

  sendComment() {
    var request = {
      userName: this.comment.userName,
      descriptions: this.comment.description,
      motelId: this.id
    };
    this.motelService.sendComment(request).subscribe(res => {
      if (res.success) {
        this.getComment();
      }
    })


  }

  getComment() {
    this.motelService.getComment(this.id).subscribe(res => {
      this.comments = res.data;
    })
  }

  deleteComment(id:any) {
    this.motelService.deleteComment(id).subscribe(res=>{
      if(res.data){
        this.toastrService.success("Xóa thành công!");
        this.getComment();
      }
    })
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
}
