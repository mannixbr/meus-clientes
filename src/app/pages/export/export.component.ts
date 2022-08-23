import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumbItem } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  id: any = '';

  breadcrumb: Array<PoBreadcrumbItem> = [
    { label: 'Home', action: this.backHome.bind(this) }, { label: 'Exportar produtos' }
  ];

  constructor(
    private router: Router,
    private storage: PoStorageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.router.url.split('/')[2]
  }

  exportarTodos(){
    console.log('exportar todos');
  }

  downloadCustomers() {
    this.storage.get('clientes').then((clientes: any) => {
      console.log(clientes);
      let js = JSON.stringify(clientes);
      const blob = new Blob([js], { type: 'text/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'clientes.json');
      link.click();
    })
      
  }

  downloadProducts() {
    this.storage.get('produtos').then((clientes: any) => {
      let js = JSON.stringify(clientes);
      const blob = new Blob([js], { type: 'text/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'produtos.json');
      link.click();
    })
      
  }

  

  backHome() {
    this.router.navigate(['home', this.id]);
  }
}
