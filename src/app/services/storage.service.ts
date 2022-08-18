import { PoStorageService } from '@po-ui/ng-storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private poStorage: PoStorageService) { }

  getClientes() {
    return this.poStorage.get('clientes')
  }

  getProdutos() {
    return this.poStorage.get('produtos')
  }

}
