import { Injectable } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataSharingService } from '../directive/data-sharing.service';

@Injectable()
export class Helper {
    loading: any;
    constructor(
        private dataSharingService: DataSharingService,
        private modalService: NgbModal
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

}