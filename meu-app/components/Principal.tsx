// Importação de componentes de ciclo de vida e gerenciamento de estado:
import { useEffect, useState } from 'react';

// Importação do Provider e o do SafeAreaView:
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importa os componentes visuais nativos:
import { StyleSheet, Text, FlatList, ActivityIndicator, Alert } from 'react-native';

// Importação da interface para livros do Banco de Dados MySQL:
import { InterfaceLivro } from '../interface/InterfaceLivro'

// Importação dos componentes modulares criados:
import FormularioLivro from './FormularioLivro';
import ItemLivro from './ItemLivro';
import { lerLivros } from '../api/lerLivros'; // Função de leitura no banco de dados MySQL.
import { salvarLivro } from '../api/salvarLivro'; // Função de escrita no banco de dados MySQL.
import { excluirLivro } from '../api/excluirLivro'; // Função de exclusão no banco de dados MySQL.

// URL gerada pelo redirecionamento de portas do ambiente de nuvem do GitHub Codespaces:
const URL: string = 'https://fluffy-space-palm-tree-r4rjvrvvgjv4fx5v7-3000.app.github.dev/';
const URL_DA_API: string = URL + 'livros'; // Monta a URL final para o endpoint de livros do MySQL.

export default function Principal() {
    // ESTADOs DO SISTEMA DE GERENCIAMENTO (Tipados estritamente pelo TypeScript):
    const [livros, setLivros] = useState<InterfaceLivro[]>([]); // Estado aceita apenas um array contendo objetos do tipo InterfaceLivro.
    const [carregando, setCarregando] = useState<boolean>(true); // Estado booleano para controlar o indicador de carregamento visual.

    // ESTADOS DAS ENTRADAS DO FORMULÁRIO DE CAPTURA:
    const [titulo, setTitulo] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [estoque, setEstoque] = useState<string>('');
    const [idEdicao, setIdEdicao] = useState<number | undefined>(undefined); // Aceita número identificador ou undefined caso não haja livro selecionado.

    const carregar = () => {
        lerLivros(URL_DA_API).then((livros) => {
            setLivros(livros);
            setCarregando(false);
        });
    };

    const salvar = async (idEdicao: number | undefined, livro: InterfaceLivro) => {
        await salvarLivro(idEdicao, livro, URL_DA_API);
        limparFormulario(); // Executa o reset visual de todas as caixas de inserção.
        carregar(); // Atualiza a tela executando um novo GET automático de sincronização.
    };

    const excluir = async (id: number) => {
        const removido = await excluirLivro(id, URL_DA_API);
        if (removido) {
            if (idEdicao === id)
                limparFormulario(); // Se o item deletado for o mesmo que estava sob edição ativa, limpa a tela.
            carregar(); // Atualiza a lista, removendo o item apagado.
        }
    };

    // Intercepta o clique na lista e popula o painel superior injetando os dados do objeto selecionado.
    const iniciarEdicao = (livro: InterfaceLivro) => {
        setIdEdicao(livro.id); // Altera o estado de inserção para atualização injetando o número identificador do livro.
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setPreco(livro.preco.toString()); // Converte o tipo numérico para string para que o componente visual exiba sem erros.
        setEstoque(livro.estoque.toString()); // Converte o tipo numérico para string para que o componente visual exiba sem erros.
    };

    // Limpa todos os estados esvaziando a memória temporária do formulário de entrada:
    const limparFormulario = () => {
        setIdEdicao(undefined);
        setTitulo('');
        setAutor('');
        setPreco('');
        setEstoque('');
    };

    // Aciona a consulta de forma automatizada assim que o ciclo de montagem do app é iniciado:
    useEffect(() => {
        carregar();
    }, []); // O array vazio garante que o efeito seja executado apenas uma vez, no momento da montagem do componente.

    return (
        <SafeAreaProvider>
            <SafeAreaView style={estilos.container}>
                <Text style={estilos.titulo}>Painel CRUD Livraria (MySQL)</Text>

                {/* Acopla o componente de formulário repassando dados e gatilhos via Props: */}
                <FormularioLivro
                    titulo={titulo} setTitulo={setTitulo}
                    autor={autor} setAutor={setAutor}
                    preco={preco} setPreco={setPreco}
                    estoque={estoque} setEstoque={setEstoque}
                    idEdicao={idEdicao} salvarDados={salvar}
                    limparFormulario={limparFormulario}
                />

                {/* Condicional que avalia o estado de carregamento assíncrono: */}
                {carregando ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    // Listagem otimizada nativa para grandes volumes de registros mapeando o array vindo do banco de dados:
                    <FlatList
                        data={livros}
                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Garante chaves textuais únicas baseadas no ID incremental do MySQL.
                        renderItem={({ item }) => (
                            // Invoca o componente visual de linha injetando o livro específico:
                            <ItemLivro
                                item={item}
                                iniciarEdicao={iniciarEdicao}
                                excluirLivro={excluir}
                            />
                        )}
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const estilos = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingTop: 10 },
    titulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }
});
