// Interface para livros do Banco de Dados MySQL:
export interface InterfaceLivro {
    id: number;
    titulo: string; 
    autor: string;
    preco: number;
    estoque: number;
}
