import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdicaoProduto } from './modal-edicao-produto';

describe('ModalEdicaoProduto', () => {
  let component: ModalEdicaoProduto;
  let fixture: ComponentFixture<ModalEdicaoProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEdicaoProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEdicaoProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
