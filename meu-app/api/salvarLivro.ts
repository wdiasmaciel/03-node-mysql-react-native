// Importa componente visual nativo:
import { Alert } from 'react-native';

// Importação da interface para livros do Banco de Dados MySQL:
import { InterfaceLivro } from '../interface/InterfaceLivro'

// OPERAÇÃO CREATE (POST) & UPDATE (PUT): gravação e modificação de tuplas:
export async function salvarLivro(idEdicao: number | undefined, livro: InterfaceLivro, URL_DA_API: string) {
    const { titulo, autor, preco, estoque } = livro;

    // Validação preventiva no front-end para evitar o envio de strings ou dados em branco:
    if (!titulo || !autor || !preco || !estoque) {
        Alert.alert('Erro', 'Por favor, realize o preenchimento de todos os campos!');
        return;
    }

    // Monta o objeto a ser salvo no banco de dados, convertendo os tipos de entrada para os tipos esperados pelo MySQL:
    const dadosLivro = {
        titulo: titulo.trim(),
        autor: autor.trim(),
        preco: preco,
        estoque: estoque
    };

    // Monta a rota e o verbo HTTP dinamicamente baseado na presença do ID de edição
    const urlFinal = idEdicao == undefined ? URL_DA_API : `${URL_DA_API}/${idEdicao}`;
    const metodoHttp = idEdicao == undefined ? 'POST' : 'PUT';

    await fetch(urlFinal, {
        method: metodoHttp,
        headers: { 'Content-Type': 'application/json' }, // Cabeçalho sinaliza que o corpo está em notação JSON.
        body: JSON.stringify(dadosLivro), // Transforma o objeto tipado em string textual para transporte na rede HTTP.
    })
        .then((resposta) => resposta.json())
        .then(() => {
            Alert.alert('Sucesso!', idEdicao == undefined ? 'Livro cadastrado no MySQL!' : 'Livro atualizado no MySQL!');
        })
        .catch((erro) => console.error('Erro ao processar requisição no servidor:', erro));
};
