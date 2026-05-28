import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from './services/produto';
import { Produto } from './models/produto';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { CadastroProdutoModalComponent } from './components/modal-component/modal-component';
import { EdicaoProdutoModalComponent } from './components/modal-edicao-produto/modal-edicao-produto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CadastroProdutoModalComponent, EdicaoProdutoModalComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent implements OnInit {
  private gatilhoAtualizacao$ = new BehaviorSubject<void>(undefined);

  listaDeProdutos$: Observable<Produto[]> = this.gatilhoAtualizacao$.pipe(
    switchMap(() => this.produtoService.listarProdutos(1, 20))
  );

  modalCadastroAberto = false;

  modalEdicaoAberto = false;
  produtoSelecionado: Produto | null = null;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
  }

  carregarProdutos(): void {
    this.gatilhoAtualizacao$.next();
  }

  abrirModalCadastro(): void {
    this.modalCadastroAberto = true;
  }

  fecharModalCadastro(): void {
    this.modalCadastroAberto = false;
  }

  prepararEdicao(produto: Produto): void {
    this.produtoSelecionado = produto; 
    this.modalEdicaoAberto = true; 
  }

  fecharModalEdicao(): void {
    this.modalEdicaoAberto = false;
    this.produtoSelecionado = null; 
  }

  eliminarProduto(id: string | undefined): void {
    if (!id) {
      alert('Não é possível eliminar um produto sem ID válido.');
      return;
    }

    const confirmar = confirm('Tem certeza que deseja eliminar este produto definitivamente?');
    
    if (confirmar) {
      this.produtoService.deletarProduto(id).subscribe({
        next: () => {
          alert('Produto eliminado com sucesso!');
          this.carregarProdutos();
        },
        error: (erro: any) => {
          console.error('Erro ao eliminar o produto:', erro);
          alert('Não foi possível eliminar o produto.');
        }
      });
    }
  }
}