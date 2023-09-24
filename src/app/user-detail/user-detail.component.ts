import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, addDoc, onSnapshot, doc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  firestore: Firestore = inject(Firestore);
  userId = '';
  currentUser: User = new User();
  constructor(private route:ActivatedRoute, public dialog: MatDialog){}


  ngOnInit(){
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id');
      this.getUserData(this.userId);
  })
  }


  getUserData(id: string){
     const getData = onSnapshot(doc(this.firestore, "users", id), (doc) => {
      this.currentUser = new User(doc.data());
  });
  }

  editUserDetails(){
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = this.currentUser;
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.user = this.currentUser;
  }
}
