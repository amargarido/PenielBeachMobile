import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscolaDeDiscipulosPage } from './escola-de-discipulos.page';

describe('EscolaDeDiscipulosPage', () => {
  let component: EscolaDeDiscipulosPage;
  let fixture: ComponentFixture<EscolaDeDiscipulosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolaDeDiscipulosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscolaDeDiscipulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
