import { Component } from '@angular/core';
import { MotelService } from '../../service/motel.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-bai-dang-user',
  templateUrl: './quan-ly-bai-dang-user.component.html',
  styleUrl: './quan-ly-bai-dang-user.component.css'
})
export class QuanLyBaiDangUserComponent {
  motelResponses: any;
  idReject: any;
  reason: any;
  model: any = {};
  file: any;

  //
  imageSrc: string | any;
  showimage: boolean = true;
  user: any;
  constructor(private motelService: MotelService, private toastrService: ToastrService, private router: Router) {
  }
  ngOnInit(): void {
    this.user = this.getWithExpiry('user');
    this.motelService.getMotel(this.user).subscribe(res => {
      this.motelResponses = res.data;
    });
  }
  hired(id: any) {
    this.motelService.hired(id).subscribe(res => {
      if (res.success) {
        this.toastrService.success("Đã thuê!");

        this.motelService.getMotel(this.user).subscribe(res => {
          this.motelResponses = res.data;
        });
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

  buttonReject(id: any) {
    this.idReject = id;
  }
  reject() {
    var motelReject = {
      id: this.idReject,
      reason: this.reason
    }
    if (!this.reason) {
      this.toastrService.error("Từ chốt bài đăng thất bại");
      return;
    }

    this.motelService.reject(motelReject).subscribe(res => {
      if (res.success) {
        this.toastrService.success("Từ chối bài đăng!");

        this.motelService.getMotel(this.user).subscribe(res => {
          this.motelResponses = res.data;
        });
      }
    })
  }

  detailMotel(motelResponses: any) {

    //this.router.navigateByUrl('/bai-dang/' + motelResponses)
    this.motelService.getMotelById(motelResponses).subscribe(res => {
      if (res.success) {
        this.model = res.data
      }
    });
    this.model = motelResponses;
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

  createMotel() {
    if (this.file) {
      this.model.file = this.file.File;
    }
    this.model.status = 2; //pending
    this.model.price = 0;
    this.model.rate = 1;
    this.model.reason = "";
    this.model.userName = this.getWithExpiry('user');
    this.motelService.updateMotel(this.model).subscribe(res => {
      console.log(res.data)
      if (res.success) {
        this.toastrService.success("Chỉnh sửa bài đăng thành công!")
        this.router.navigateByUrl('/')
      }
    })
  }

  readURL(event: any): void {
    this.showimage = false;
    if (event?.target?.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

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
