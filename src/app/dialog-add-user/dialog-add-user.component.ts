import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate: Date;
  updateID;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>){
    
  }

  async saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    const docRef = await addDoc(collection(this.firestore, "users"), this.user.toJson())
    this.updateID = docRef.id;
    this.loading = false;
    this.dialogRef.close();
  }
}
