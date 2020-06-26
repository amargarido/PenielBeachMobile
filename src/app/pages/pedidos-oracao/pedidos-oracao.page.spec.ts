import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosOracaoPage } from './pedidos-oracao.page';

describe('PedidosOracaoPage', () => {
  let component: PedidosOracaoPage;
  let fixture: ComponentFixture<PedidosOracaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosOracaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosOracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
