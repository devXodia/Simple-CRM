import { Component, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, updateDoc, onSnapshot, doc, collection} from '@angular/fire/firestore';
import { inject } from '@angular/core';
@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})


export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);
  user: User;
  userId: string;
  loading = false;
  birthDate: Date;
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){}


  async saveUser(){
    let userRef = this.getUserDoc();
    await updateDoc(userRef, this.user.toJson())
    this.dialogRef.close();
  }
  

 getUserDoc(){
  return doc(collection(this.firestore, 'users'), this.userId);
 }
}