import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-cadastro-produto-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-component.html'
})
export class CadastroProdutoModalComponent {
  @Input() isOpen = false;
  @Output() fechar = new EventEmitter<void>();
  @Output() produtoSalvo = new EventEmitter<void>();

  produtoForm: FormGroup;

  tiposDeProdutos: string[] = ['Eletrônico', 'Alimentos', 'Vestuário', 'Cosméticos', 'Outros'];

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required], // Continua obrigatório
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]],
      quantidadeEmEstoque: [0, [Validators.required, Validators.min(0)]],
      descricao: ['', Validators.required] 
    });
  }

  salvar(): void {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }

    const novoProduto: Produto = this.produtoForm.value;

    this.produtoService.cadastrarProduto(novoProduto).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.produtoSalvo.emit();
        this.fecharModal();
      },
      error: (erro: any) => {
        console.error('Erro ao cadastrar produto:', erro);
        if (erro.status === 400 && erro.error?.mensagem) {
          alert(erro.error.mensagem);
        } else {
          alert('Não foi possível salvar o produto no banco de dados.');
        }
      }
    });
  }

  fecharModal(): void {
    this.produtoForm.reset({ 
      nome: '',
      tipo: '',
      precoUnitario: 0, 
      quantidadeEmEstoque: 0,
      descricao: '' 
    });
    this.fechar.emit();
  }
}