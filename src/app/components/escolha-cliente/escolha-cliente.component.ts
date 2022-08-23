import { StorageService } from './../../services/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoModalComponent, PoStepComponent, PoStepperComponent, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { FazerPedidosComponent } from '../../pages/fazer-pedidos/fazer-pedidos.component';



@Component({
  selector: 'app-stepper',
  templateUrl: './escolha-cliente.component.html',
  styleUrls: ['./escolha-cliente.component.scss']
})
export class EscolhaClienteComponent implements OnInit {

  @ViewChild('successData', { static: true }) successData!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  currentActiveStep!: PoStepComponent;
  name!: string;
  clientes: any[] = [];

  columns: Array<PoTableColumn> = [
    { property: 'nome' },
    { property: 'whatsapp', label: 'WhatsApp' },
    { property: 'estabelecimento', label: 'Estabelecimento' }
  ];

  constructor(
    private fazerPedidos: FazerPedidosComponent,
    private poStorage: PoStorageService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.storage.getClientes().then((res) => {
      this.clientes = res;
    });
  }

  confirmedClient() {
    const selectedItems = this.poTable.getSelectedRows();
    if (selectedItems.length > 0) {
      this.poStorage.set('clientName', selectedItems[0].nome);
      this.poStorage.remove('clientIDSelect')

      this.poStorage.set('clientIDSelect', selectedItems[0].id);
      console.log('cliente selecionado', selectedItems[0]);


      this.fazerPedidos.clientSelected = true;
      this.fazerPedidos.stepper.next();
    } else {
      console.log(selectedItems.length);
    }

  }
}
