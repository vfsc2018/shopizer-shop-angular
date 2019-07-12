import { Injectable } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataSharingService } from '../directive/data-sharing.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class Helper {
    loading: any;
    constructor(
        private dataSharingService: DataSharingService,
        private modalService: NgbModal,
        private translate: TranslateService
    ) { }


    showMiniCart() {
        if (this.dataSharingService.modelRef.getValue()) {
            this.dataSharingService.modelRef.getValue().close()
            let modalRef = this.modalService.open(CartComponent);
            modalRef.componentInstance.isOpen = true;
            this.dataSharingService.modelRef.next(modalRef);
        } else {
            let modalRef = this.modalService.open(CartComponent);
            modalRef.componentInstance.isOpen = true;
            this.dataSharingService.modelRef.next(modalRef);
        }
    }

    languageChange() {
        if (localStorage.getItem('langulage') == 'en') {
            localStorage.setItem('langulage', 'fr');
            this.translate.use('fr');
        } else {
            localStorage.setItem('langulage', 'en');
            this.translate.use('en');
        }
    }

}