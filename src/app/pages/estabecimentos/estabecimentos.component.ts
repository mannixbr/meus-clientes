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
    private androidPermissions: AndroidPermissions,
    private poNotify: PoNotificationService
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

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => { },
      err => {
        this.androidPermissions.requestPermissions(
          [
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.INTERNET
          ]
        )
      }).catch((err) => { });

  }

  saveE() {
    if (this.e_name != '') {  
      this.e_todo.push({
        "id": Math.floor(Date.now() * Math.random()).toString(36),
        "nome": this.e_name
      })
      this.storage.set('activated', this.e_name).then((res) => {
        this.storage.set('estabelecimento', this.e_todo).then((res) => {
          this.storage.get('estabelecimento').then((item) => {
            this.e_todo = item;
            this.loading = false;
            
            for (let index = 0; index < item.length; index++) {
              if (this.e_todo[index].id === item[index].id) {
                this.usarE(item[index].id); 
              }
            }
          })
        })
      })
    }else{
      this.poNotify.error('Preencha o campo e tente novamente')
    }
  }

  usarE(index: any) {
    this.router.navigate(['/home', index])
  }

}
