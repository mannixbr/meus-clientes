import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoNotificationService } from '@po-ui/ng-components';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-estabecimentos',
  templateUrl: './estabecimentos.component.html',
  styleUrls: ['./estabecimentos.component.scss']
})
export class EstabecimentosComponent implements OnInit {

  hasEstabelecimentos: boolean = false;
  e_name: string = ''
  e_todo: Array<any> = []
  loading: boolean = true;

  constructor(
    private storage: PoStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.storage.exists('estabelecimento').then((res) => {
      if (res == true) {
        this.storage.get('estabelecimento').then((item) => {
          this.e_todo = item;
          this.hasEstabelecimentos = true;
          this.loading = false;
        })
      } else {
        this.hasEstabelecimentos = res;
        this.loading = false;
      }

    }).catch((err) => { })

  }

  saveE() {
    this.e_todo.push({
      "id": Math.floor(Date.now() * Math.random()).toString(36),
      "nome": this.e_name
    })
    this.storage.set('activated', this.e_name).then((res) => {
      this.storage.set('estabelecimento', this.e_todo).then((res) => {
        this.storage.get('estabelecimento').then((item) => {
          this.e_todo = item;
          this.loading = false;
        })
      })
    })
  }

  usarE(index: any) {
    this.router.navigate(['/home', index])
  }

}
