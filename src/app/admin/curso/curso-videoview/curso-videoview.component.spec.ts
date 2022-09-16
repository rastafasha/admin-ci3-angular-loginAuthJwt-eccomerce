import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoVideoviewComponent } from './curso-videoview.component';

describe('CursoVideoviewComponent', () => {
  let component: CursoVideoviewComponent;
  let fixture: ComponentFixture<CursoVideoviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoVideoviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoVideoviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
