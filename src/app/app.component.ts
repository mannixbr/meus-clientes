import { Component, OnInit } from '@angular/core';
import { PoStorageService } from '@po-ui/ng-storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private storage: PoStorageService,
  ) { }


  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface, @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    this.storage.remove('authenticated');
  }
}
