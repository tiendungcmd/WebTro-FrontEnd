import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MotelService } from '../../service/motel.service';

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
  constructor(private route: ActivatedRoute, private motelService: MotelService) {

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
  }

  showPhone() {
    this.hidePhone = this.phone;
    this.hiddenPhone = false;
  }
}
