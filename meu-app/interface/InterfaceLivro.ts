// Interface para livros do Banco de Dados MySQL:
export interface InterfaceLivro {
    id: number | undefined; // ID do livro, pode ser indefinido se for um novo cadastro.
    titulo: string; 
    autor: string;
    preco: number;
    estoque: number;
}
