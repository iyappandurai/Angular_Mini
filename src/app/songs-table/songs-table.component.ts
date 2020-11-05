import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import{SongsService} from '../songs.service'
import{Songs} from '../songs'

@Component({
  selector: 'app-songs-table',
  templateUrl: './songs-table.component.html',
  styleUrls: ['./songs-table.component.css']
})
export class SongsTableComponent implements OnInit {

  constructor(public songService:SongsService) { }

  ngOnInit() {
    this.songService.fetchSongs()
    .subscribe((obj:Songs[])=>{
      debugger;
    })
  }
  OnDelete(id:number){
    debugger
    if(confirm("If you want to delete the selected Song"))
    this.songService.deleteSong(id);

  }

}
