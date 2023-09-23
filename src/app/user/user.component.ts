import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, addDoc, onSnapshot, doc } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
user = new User();
firestore: Firestore = inject(Firestore);
unsubUserList;
allUsers = [];

  constructor(public dialog: MatDialog){
    
  }

  ngOnInit(){
    this.subUserList();
    this.unsubUserList = this.subUserList();
  };
  

  subUserList(){
    return onSnapshot(this.getUsersCollection(), (list) =>{
      this.allUsers = [];
      list.forEach(user => {
        const userData = user.data();
        this.allUsers.push(userData);
        console.log('Array with Users:', this.allUsers);
      });
    })
  }

  getUsersCollection(){
    return collection(this.firestore, 'users');
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent)
  }



  ngOnDestroy(){
    this.unsubUserList();
  }
  }
  

