import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoChartSerie, PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly menus: Array<PoMenuItem> = [
    
    {
      label: 'Adicionar Produto',
      action: this.addProdutos.bind(this)
    },
    {
      label: 'Exportar Dados',
      action: this.exportData.bind(this)
    },
    {
      label: 'Importar Dados',
      action: this.importData.bind(this)
    },
    {
      label: 'Suporte',
      action: this.support.bind(this)
    }
  ];

  series: Array<PoChartSerie> = [
    {
      label: 'clientes pagos',
      data: 100
    },
    {
      label: 'clientes nao pagos',
      data: 300
    },
    {
      label: 'clientes',
      data: 400
    }
  ];
  id: string = '';

  nome: string = '';

  constructor(
    private router: Router,
    private storage: PoStorageService,
    private finger: FingerprintAIO,
    private notify: PoNotificationService,
    private androidPermissions: AndroidPermissions

  ) { }

  ngOnInit(): void {

    this.finger.show({
      title: 'Autenticação',
      subtitle: 'Para sua seguranca e para não ser permitido acesso indevido',
      cancelButtonTitle: 'Cancelar'
    })
      .then((result: RTCDtlsFingerprint) => {
        if (result !== 'biometric_success') {
          this.notify.error('Usuario errado.')
          this.router.navigate([`/estabelecimentos`])
          return
        }
        this.notify.success('Autenticação realizada com sucesso.')
      })
      .catch((error: any) => {
        this.notify.error('Este aparelho nao suporta')
      });


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



    this.storage.get("activated").then((item) => {
      this.nome = item;

    });
    this.id = this.router.url.split('/')[2]
    this.storage.set('user', this.id)

  }

  support() {
    let target = ` https://wa.me/5511912624039?text=Olá, estou entrando em contato pelo aplicativo Meus Clientes, preciso falar sobre algo.`
    window.open(target, '_system')
  }

  exportData(value: any) {
    this.router.navigate([`/export/${this.id}`])
  }

  importData(value: any) {
    this.router.navigate([`/importDatas/${this.id}`])
  }

  navegate(rota: any) {
    this.router.navigate([`/${rota}`])
  }

  closeRequest() {
    this.router.navigate([`/fecharPedido/${this.id}`])
  }

  addProdutos(rota: any) {
    this.router.navigate([`/addProdutos/${this.id}`])
  }

  customers() {
    this.router.navigate([`/clientes/${this.id}`])
  }

}
