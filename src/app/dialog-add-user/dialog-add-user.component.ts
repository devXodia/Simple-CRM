import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
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

  constructor(){
    
  }

  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('current User', this.user);

    const docRef = await addDoc(collection(this.firestore, "users"), this.user.toJson())
    this.updateID = docRef.id;
    console.log("Document written with ID: ", this.updateID);
  }
}
