import { Component, OnInit } from '@angular/core';
import { MotelService } from '../../service/motel.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dang-tin',
  templateUrl: './dang-tin.component.html',
  styleUrl: './dang-tin.component.css'
})
export class DangTinComponent implements OnInit {
  model: any = {};
  file: any;
  constructor(private motelService: MotelService,private toastrService: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    // this.model.images = [];
  }

  createMotel() {
    this.model.file = this.file.File;
    this.model.status = 2; //pending
    this.model.price = 0;
    this.model.rate = 1;
    this.model.reason = "";
    this.model.userName = localStorage.getItem('user');
    this.motelService.postMotel(this.model).subscribe(res => {
      console.log(res.data)
      if(res.success){
        this.toastrService.success("Tạo bài đăng thành công!")
        this.router.navigateByUrl('/')
      }
    })
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
}
export interface SelectedFiles {
  name: string
  base64?: string
  type?: string
}
