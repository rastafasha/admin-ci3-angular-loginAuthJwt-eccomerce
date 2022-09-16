import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoVideosComponent } from './curso-videos.component';

describe('CursoVideosComponent', () => {
  let component: CursoVideosComponent;
  let fixture: ComponentFixture<CursoVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
