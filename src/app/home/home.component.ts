import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MotelService } from '../service/motel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  motels:any;
  constructor(private motelService: MotelService) {

  }
  images: silde[] = [];
  ngOnInit(): void {
    this.images = [{
      imgSrc:'assets/image1.jpg',
      imgAlt:'image 1'
    },
    {
      imgSrc:'assets/image2.jpg',
      imgAlt:'image 2'
    },
    {
      imgSrc:'assets/image3.jpg',
      imgAlt:'image 3'
    }]

    this.motelService.getMotel().subscribe(res=>{
      if(res.success){
        this.motels = res.data;
      }
    });
  }
}
interface silde {
  imgSrc: string,
  imgAlt: string
}
