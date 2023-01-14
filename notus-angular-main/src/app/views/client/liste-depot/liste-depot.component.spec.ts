import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDepotComponent } from './liste-depot.component';

describe('ListeDepotComponent', () => {
  let component: ListeDepotComponent;
  let fixture: ComponentFixture<ListeDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
