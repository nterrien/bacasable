import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../models/customer.model';

//Je devrait mettre ça dans un autre dossier
// La je test un peu à l'arrache
@Component({
    selector: 'add-customer',
    templateUrl: 'add-customer.html',
})
export class AddCustomerComponent {

    constructor(
        public dialogRef: MatDialogRef<AddCustomerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Customer) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
