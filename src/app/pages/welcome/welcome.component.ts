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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storage.exists('estabelecimento').then((res) => {
      if (res == true) {
        console.log('existe');
        //this.router.navigate(['/estabelecimentos'])
      }
    }).catch(err => {})
  }

  saveE() {
    this.e_todo.push({
      "id": Math.floor(Date.now() * Math.random()).toString(36),
      "nome": this.e_name
    })
    console.log(this.e_todo);
    
    this.storage.set('estabelecimento', this.e_todo).then((res) => {
      this.router.navigate(['/home'])
    })
  }

}
