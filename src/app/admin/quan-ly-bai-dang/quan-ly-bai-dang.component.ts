import { Component, OnInit } from '@angular/core';
import { MotelService } from '../../service/motel.service';
import { TableModule } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-quan-ly-bai-dang',
  templateUrl: './quan-ly-bai-dang.component.html',
  styleUrl: './quan-ly-bai-dang.component.css',

})
export class QuanLyBaiDangComponent implements OnInit {
  motelResponses:any;
  idReject: any;
  reason:any;
  constructor(private motelService: MotelService,private toastrService: ToastrService) {
  }
  ngOnInit(): void {
    this.motelService.getMotel(null).subscribe(res=>{
      this.motelResponses = res.data;
    });
  }
  approve(id:any){
    this.motelService.approve(id).subscribe(res=>{
      if(res.success){
        this.toastrService.success("Phê duyệt thành công!");

        this.motelService.getMotel("").subscribe(res=>{
          this.motelResponses = res.data;
        });
      }
    })
  }

  buttonReject(id:any){
    this.idReject = id;
  }
  reject(){
    var motelReject ={
      id: this.idReject,
      reason : this.reason
    }
    if(!this.reason){
      this.toastrService.error("Từ chốt bài đăng thất bại");
      return;
    }

    this.motelService.reject(motelReject).subscribe(res=>{
      if(res.success){
        this.toastrService.success("Từ chối bài đăng!");

        this.motelService.getMotel("").subscribe(res=>{
          this.motelResponses = res.data;
        });
      }
    })
  }

  deleteMotel(id: any){
    this.motelService.deleteMotel(id).subscribe(res=>{
      if(res.success){
        this.toastrService.success("Xóa bài đăng thành công!");

        this.motelService.getMotel("").subscribe(res=>{
          this.motelResponses = res.data;
        });
      }
    })
  }
}
