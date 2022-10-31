import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/models/app/AppRoutes';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss'],
})
export class ProfileMainComponent implements OnInit {

  AppRoutes: any = AppRoutes;
  toggleSideBar: boolean = false;
  totalUnreadMessages:any
  unReadFollowup: number;

  constructor(
    private router: Router,
    private profileService: ProfileService
 ) {}

  ngOnInit(): void {
    this.getUnReadFollowup();

  }

  getUnReadFollowup() {
    this.profileService.getUnReadFollowup().subscribe((unReadFollowup: number) => {
        this.unReadFollowup = unReadFollowup;
    })
}

}
