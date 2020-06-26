import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  
  constructor(
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
  }

  showSkip = true;
  onSlideChangeStart(event /*: { target: { isEnd: () => Promise<any>; }; }*/) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/atividades', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

}

