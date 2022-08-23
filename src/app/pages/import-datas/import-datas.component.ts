import { PoStorageService } from '@po-ui/ng-storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoBreadcrumbItem, PoNotificationService } from '@po-ui/ng-components';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-import-datas',
  templateUrl: './import-datas.component.html',
  styleUrls: ['./import-datas.component.scss']
})
export class ImportDatasComponent implements OnInit {
  id = '';
  breadcrumb: Array<PoBreadcrumbItem> = [
    { label: 'Home', action: this.backHome.bind(this) }, { label: 'Adicionar Cliente' }
  ];
  constructor(
    private storage: PoStorageService,
    private notify: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  uploadCliente(event: any) {
    // load file json and parse to json
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      const json = JSON.parse(text);
      this.storage.set('clientes', json).then(() => {
        this.notify.success('Clientes importados com sucesso!');
        this.router.navigate(['/'])
      });
    }
    reader.readAsText(file);
  }

  uploadProduto(event: any) {
    // load file json and parse to json
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      const json = JSON.parse(text);
      this.storage.set("produtos", json)
      // redirect to home
      this.notify.success('Produto importado com sucesso!')
      this.router.navigate(['/']);
    }
    reader.readAsText(file);
  }
  
  backHome() {
    this.router.navigate(['home', this.id])
  }
}
