import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IgrejaPage } from './igreja.page';

describe('IgrejaPage', () => {
  let component: IgrejaPage;
  let fixture: ComponentFixture<IgrejaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgrejaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IgrejaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
