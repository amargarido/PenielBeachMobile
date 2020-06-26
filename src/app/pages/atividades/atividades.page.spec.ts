import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtividadesPage } from './atividades.page';

describe('AtividadesPage', () => {
  let component: AtividadesPage;
  let fixture: ComponentFixture<AtividadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
