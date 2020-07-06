import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CultoAoVivoPage } from './culto-ao-vivo.page';

describe('CultoAoVivoPage', () => {
  let component: CultoAoVivoPage;
  let fixture: ComponentFixture<CultoAoVivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultoAoVivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CultoAoVivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
