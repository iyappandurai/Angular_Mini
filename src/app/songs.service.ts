import { Injectable } from '@angular/core';
import {Songs} from './songs'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar'
//import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
songs:Songs[];
url:string;
httpOption:object;
  constructor( private http:HttpClient,private snackBar:MatSnackBar) { 
    this.songs=[];
    this.url='http://localhost:3000/songs';
    this.httpOption={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }
  fetchSongs():Observable<any>{
    debugger;
return this.http.get<Songs[]>(this.url)
.pipe(
  tap((songs:Songs[]):Observable<any>=>{
    debugger;
    this.songs=songs;
    return of({})
  }),
  catchError((err:any):Observable<any>=>{
    debugger;
    //console.log(err);
    return of([])
  }
  
  )
)
  }
  addSong(song:Songs):Observable<any>{
    return this.http.post<Songs>(this.url,{
title:song.title,
duration:song.duration,
genre:song.genre
    },this.httpOption)
    .pipe(
      tap((song:Songs):Observable<any>=>{
        debugger;
        this.songs.push(new Songs(song.id,song.title,song.duration,song.genre));
        return of({})
      }),
      catchError((err:any):Observable<any>=>{
        debugger;
        //console.log(err);
        return of([])
      }
      
      )
    )
  }
  deleteSong(id:number){
    this.http.delete(`${this.url}/${id}`)
    .pipe(  catchError((err:any):Observable<any>=>{
      debugger;
      //console.log(err);
      return of([])
    }
    
    )).subscribe((obj)=>{
    this.songs=this.songs.filter(s=>s.id!=id);
    this.snackBar.open("Song deleted successfully","Notice",{
      duration:2000
    })
    })
  }
 
}

