import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MuralPage } from './mural.page';

describe('MuralPage', () => {
  let component: MuralPage;
  let fixture: ComponentFixture<MuralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MuralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
