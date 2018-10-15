import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(public authTokenService: AngularTokenService) { }

  ngOnInit() {
  }

}
