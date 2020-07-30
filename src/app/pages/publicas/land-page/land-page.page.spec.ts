import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandPagePage } from './land-page.page';

describe('LandPagePage', () => {
  let component: LandPagePage;
  let fixture: ComponentFixture<LandPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
