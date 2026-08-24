// Define o contrato de tipos (Interface) para todas as propriedades (props) do formulário.
export interface PropriedadesFormulario {
    titulo: string; // O texto do título é uma string.
    setTitulo: (texto: string) => void; // Função que recebe uma string e retorna nada (void).

    autor: string; // O texto do autor é uma string.
    setAutor: (texto: string) => void; // Função que recebe uma string e retorna nada (void).
    
    preco: string; // O input de preço é manipulado como string no campo de texto.
    setPreco: (texto: string) => void; // Função que recebe uma string e retorna nada (void).
    
    estoque: string; // O input de estoque é manipulado como string no campo de texto.
    setEstoque: (texto: string) => void; // Função que recebe uma string e retorna nada (void).

    /*
    * Numa operação de cadastro (POST): idEdicao armazena null.
    * Numa operação de edição (PUT): idEdicao armazena o ID do livro que sofreu atualização.  
    */
    idEdicao: number | null; // Pode ser o número do ID ou nulo se for um novo cadastro.

    salvarDados: () => void; // Função de envio que roda no clique do botão principal.

    limparFormulario: () => void; // Função para resetar os estados, limpando os campos do formulário.
}