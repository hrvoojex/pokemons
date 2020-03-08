import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionTwoModalComponent } from './version-two-modal.component';

describe('VersionTwoModalComponent', () => {
  let component: VersionTwoModalComponent;
  let fixture: ComponentFixture<VersionTwoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionTwoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionTwoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
