// Importa o tipo do livro:
import { InterfaceLivro } from '../interface/InterfaceLivro';

// Define o contrato de tipos das propriedades esperadas por cada livro na linha da lista:
interface PropriedadesLivro {
    item: InterfaceLivro; // Recebe um objeto livro.
    iniciarEdicao: (livro: InterfaceLivro) => void; // Função que carrega o livro clicado de volta para o formulário.
    excluirLivro: (id: number) => void; // Função que deleta o item recebendo o ID numérico correspondente.
}
