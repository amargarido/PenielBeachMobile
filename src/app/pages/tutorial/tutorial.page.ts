import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 700
  };
  
  constructor(
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {
  }

  showSkip = true;
  onSlideChangeStart(event /*: { target: { isEnd: () => Promise<any>; }; }*/) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }
// this.router.navigate(['login']);
  startApp() {
    this.menu.enable(true);
    this.router.navigateByUrl('/login');
  }

}

