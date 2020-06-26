import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComunidadePage } from './comunidade.page';

describe('ComunidadePage', () => {
  let component: ComunidadePage;
  let fixture: ComponentFixture<ComunidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComunidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
