import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  e_name: string = ''
  e_todo: Array<any> = []

  constructor(
    private storage: PoStorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.storage.set('fingerprint', false).then(res => console.log(res)).catch(err => console.log(err))

    this.storage.exists('estabelecimento').then((res) => {
      if (res == true) {
        console.log('existe');
        //this.router.navigate(['/estabelecimentos'])
      }
    }).catch(err => { })
  }

  saveE() {
    this.http.post('https://localhost:7272/api/Estabelecimentos', {
        id: 0,
        nome: this.e_name
    }).subscribe((res: any) => {
      console.log(res);

    })
    /*  this.e_todo.push({
       "id": Math.floor(Date.now() * Math.random()).toString(36),
       "nome": this.e_name
     })
     console.log(this.e_todo);

     this.storage.set('estabelecimento', this.e_todo).then((res) => {
       this.router.navigate(['/home'])
     }) */
  }

}
