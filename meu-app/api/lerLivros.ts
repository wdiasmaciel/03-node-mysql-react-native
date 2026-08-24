// Importação da interface para livros do Banco de Dados MySQL:
import { InterfaceLivro } from '../interface/InterfaceLivro'

// OPERAÇÃO READ (GET): busca em lote todos os livros salvos no MySQL:
export async function lerLivros(URL_DA_API: string) {
    let livros: InterfaceLivro[] = [];

    await fetch(URL_DA_API)
        .then((resposta) => resposta.json()) // Extrai o fluxo de dados transformando o texto em JSON.
        .then((dados: InterfaceLivro[]) => { // Diz ao TypeScript que os dados de resposta obedecem à estrutura padrão.
            livros = dados; // Popula o array com a resposta oficial do banco.
        })
        .catch((erro) => console.error('Erro ao buscar livros no banco de dados:', erro));

    return livros;
};
