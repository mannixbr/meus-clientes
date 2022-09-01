import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx";
import { Injectable } from "@angular/core";
import { PoStorageService } from "@po-ui/ng-storage";
import { PoNotificationService } from "@po-ui/ng-components";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ServiceService {

  constructor(
    private finger: FingerprintAIO,
    private storage: PoStorageService,
    private notify: PoNotificationService,
    private router: Router,
  ) { }

  setUp() {
    this.fingerPrintServiceIsAvaliable();
  }

  fingerPrintServiceIsAvaliable() {
        this.storage.get("fingerprint").then((fingerprint) => {
          if (fingerprint !== null && fingerprint === true) {
            // chamada do fingerprint
            this.fingerPrintServiceShow();
            return;
          }

        }).catch(() => {
          this.notify.error("Não foi possível obter o fingerprint do usuário");
          this.storage.set("fingerprint", false);
        });
  }

  fingerPrintServiceShow() {
    this.finger.show({
      title: "Autenticação de impressão digital",
      subtitle: "Para continuar, autentique sua impressão digital",
      fallbackButtonTitle: "Usar senha",
      description:
        "Para autenticar sua impressão digital, você precisa colocar seu dedo no sensor de impressão digital.",
      disableBackup: true,
    }).then((result: RTCDtlsFingerprint) => {
      if (result !== 'biometric_success') {
        this.notify.error('Usuario errado.')
        this.storage.set("fingerprint", false);
        this.router.navigate([`/estabelecimentos`])
        return
      } else {
        this.notify.success('Autenticação realizada com sucesso.')
        this.storage.set("fingerprint", true);
      }
    }).catch((err) => {
      this.storage.set("fingerprint", false);
    });
  }
}
