import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, updateDoc, onSnapshot, doc, collection} from '@angular/fire/firestore';
import { inject } from '@angular/core';
@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})



export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);
  user: User;
  loading = false;
  userId: string; 
  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){}

  async saveUser(){
    this.loading = true;
    let userRef = this.getUserDoc();
    await updateDoc(userRef, this.user.toJson())
    this.dialogRef.close();
    this.loading = false;
  }
  

 getUserDoc(){
  return doc(collection(this.firestore, 'users'), this.userId);
 }
}
