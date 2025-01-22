import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  locations$:Observable<any> = new Observable<any[]>;
  busList:any[]=[];
  searchObj:any = {
    fromLocation:'',
    toLocation:'',
    travelDate:''
  }
  constructor(private masterService:MasterService){}
 
  ngOnInit(): void {
    this.getAllLocation()
  }

  getAllLocation(){
    this.locations$ = this.masterService.getLocations();
  }

  onSearch(){
    const {fromLocation,toLocation,travelDate} = this.searchObj
    this.masterService.searchBus(fromLocation,toLocation,travelDate).subscribe((res:any)=>{
    this,this.busList = res;
    })
  }
}
