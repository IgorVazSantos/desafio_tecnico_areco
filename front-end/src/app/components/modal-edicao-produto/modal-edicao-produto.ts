import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-edicao-produto-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-edicao-produto.html' 
})
export class EdicaoProdutoModalComponent implements OnChanges { 
  @Input() isOpen = false;
  @Input() produto: Produto | null = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() produtoSalvo = new EventEmitter<void>();

  produtoForm: FormGroup;

  tiposDeProdutos: string[] = ['Eletrônico', 'Alimentos', 'Vestuário', 'Cosméticos', 'Outros'];

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required], 
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]],
      quantidadeEmEstoque: [0, [Validators.required, Validators.min(0)]],
      descricao: ['', Validators.required] 
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produto'] && this.produto) {
      this.produtoForm.patchValue({
        nome: this.produto.nome,
        tipo: this.produto.tipo,
        precoUnitario: this.produto.precoUnitario,
        quantidadeEmEstoque: this.produto.quantidadeEmEstoque,
        descricao: this.produto.descricao
      });
    }
  }

  salvar(): void {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }

    if (!this.produto?.id) {
      alert('Não é possível atualizar um produto sem um ID válido.');
      return;
    }

    const produtoAtualizado: Produto = {
      ...this.produto,
      ...this.produtoForm.value
    };

    this.produtoService.atualizarProduto(this.produto.id, produtoAtualizado).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.produtoSalvo.emit();
        this.fecharModal();
      },
      error: (erro: any) => {
        console.error('Erro ao atualizar produto:', erro);
        if (erro.status === 400 && erro.error?.mensagem) {
          alert(erro.error.mensagem);
        } else {
          alert('Não foi possível atualizar o produto no banco de dados.');
        }
      }
    });
  }

  fecharModal(): void {
    this.produtoForm.reset();
    this.fechar.emit();
  }
}