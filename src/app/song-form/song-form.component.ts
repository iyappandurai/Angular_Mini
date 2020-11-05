import { Component, OnInit } from '@angular/core';
import { Songs } from '../songs';
import {SongsService} from '../songs.service'
import { Genre } from '../genre'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
song:Songs;
songTitle:string;
songDuration:string;
genre:Genre[];
selectedGenere:string;
  constructor(public songService:SongsService,private snackBar:MatSnackBar) {
    this.song=new Songs(null,"","","");
    this.songTitle='';
    this.songDuration='';
    this.genre=[];
    this.genre.push(new Genre("Slow",false));
    this.genre.push(new Genre("Romance",false));
    this.genre.push(new Genre("Remixed",false));
    this.selectedGenere='';
   }

  ngOnInit() {
  }
  OnSave(){
    this.genre.filter((s)=>{
      if(s.checked){
        if(this.selectedGenere=='')
      this.selectedGenere=s.name;
      else
      this.selectedGenere=this.selectedGenere+' | '+s.name;
      }
    })
    debugger;
    this.song.title=this.songTitle;
    this.song.duration=this.songDuration;
    this.song.genre=this.selectedGenere;
    if(this.song.title=="" || this.song.duration==""){
      this.snackBar.open("Please enter Mandatory fields!","Alert",{
        duration:2000
      });
    } 
    else{
      this.songService.addSong(this.song)
      .subscribe((obj=>{
        this.songTitle='';
        this.songDuration='';
        this.selectedGenere='';
        this.genre.filter(g=>g.checked=false);
        this.snackBar.open("Song added successfully!","Notice",{
          duration:2000
        });
      }));
      
      }
  
}

}
