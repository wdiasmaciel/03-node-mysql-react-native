// Importação de componentes de ciclo de vida e gerenciamento de estado:
import { useEffect, useState } from 'react'; 

// Importação do Provider e o do SafeAreaView:
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importa os componentes visuais nativos:
import { StyleSheet, Text, FlatList, ActivityIndicator, Alert } from 'react-native'; 

// Importação dos componentes modulares criados:
import FormularioLivro from './FormularioLivro';
import ItemLivro from './ItemLivro';


// URL gerada pelo redirecionamento de portas do ambiente de nuvem do GitHub Codespaces:
const URL_DA_API = 'https://github.dev';

export default function Principal() {
    // ESTADOs DO SISTEMA DE GERENCIAMENTO (Tipados estritamente pelo TypeScript):
    const [livros, setLivros] = useState<InterfaceLivro[]>([]); // Estado aceita apenas um array contendo objetos do tipo InterfaceLivro.
    const [carregando, setCarregando] = useState<boolean>(true); // Estado booleano para controlar o indicador de carregamento visual.

    // ESTADOS DAS ENTRADAS DO FORMULÁRIO DE CAPTURA:
    const [titulo, setTitulo] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [estoque, setEstoque] = useState<string>('');
    const [idEdicao, setIdEdicao] = useState<number | null>(null); // Aceita número identificador ou nulo caso não haja livro selecionado.


    // Aciona a consulta de forma automatizada assim que o ciclo de montagem do app é iniciado
    useEffect(() => {
        livros = carregarLivros();
        if(livros)
            setCarregando(false); // Esconde o componente circular de processamento da interface gráfica
    }, []);

    // 4. OPERAÇÃO CREATE (POST) & UPDATE (PUT): Gravação e modificação de tuplas
    const salvarDados = () => {
        // Validação preventiva no front-end para evitar o envio de strings ou dados em branco
        if (!titulo || !autor || !preco || !estoque) {
            Alert.alert('Erro', 'Por favor, realize o preenchimento de todos os campos!');
            return;
        }

        // Monta o payload higienizando strings e parseando formatos primitivos de números exigidos pelo banco de dados
        const dadosLivro = {
            titulo: titulo.trim(),
            autor: autor.trim(),
            preco: parseFloat(preco),
            estoque: parseInt(estoque)
        };

        // Monta a rota e o verbo HTTP dinamicamente baseado na presença do ID de edição
        const urlFinal = idEdicao !== null ? `${URL_DA_API}/${idEdicao}` : URL_DA_API;
        const metodoHttp = idEdicao !== null ? 'PUT' : 'POST';

        fetch(urlFinal, {
            method: metodoHttp,
            headers: { 'Content-Type': 'application/json' }, // Cabeçalho sinaliza que o corpo viaja em notação JSON
            body: JSON.stringify(dadosLivro), // Transforma o dicionário tipado em string textual para transporte na rede HTTP
        })
            .then((resposta) => resposta.json())
            .then(() => {
                Alert.alert('Sucesso!', idEdicao !== null ? 'Livro atualizado no MySQL!' : 'Livro cadastrado no MySQL!');
                limparFormulario(); // Executa o reset visual de todas as caixas de inserção
                carregarLivros(); // Atualiza a tela executando um novo GET automático de sincronização
            })
            .catch((erro) => console.error('Erro ao processar requisição no servidor:', erro));
    };

    // Intercepta o clique na lista e popula o painel superior injetando os dados do objeto selecionado
    const iniciarEdicao = (livro: InterfaceLivro) => {
        setIdEdicao(livro.id); // Transforma o estado de inserção para atualização injetando o número identificador do banco
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setPreco(livro.preco.toString()); // Converte os tipos numéricos para string para que o componente visual exiba sem bugs
        setEstoque(livro.estoque.toString());
    };

    // Limpa todos os estados esvaziando a memória temporária do formulário de entrada
    const limparFormulario = () => {
        setIdEdicao(null);
        setTitulo('');
        setAutor('');
        setPreco('');
        setEstoque('');
    };

    // 5. OPERAÇÃO DELETE (DELETE): Remoção física de registros baseada no ID
    const excluirLivro = (id: number) => {
        // Alerta nativo de dupla confirmação do dispositivo móvel para evitar cliques acidentais
        Alert.alert('Confirmar Exclusão', 'Deseja realmente apagar este registro do banco de dados?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: () => {
                    fetch(`${URL_DA_API}/${id}`, { method: 'DELETE' }) // Dispara o verbo DELETE direcionando ao ID específico
                        .then(() => {
                            Alert.alert('Removido!', 'O registro foi apagado do MySQL.');
                            if (idEdicao === id) limparFormulario(); // Se o item deletado for o mesmo que estava sob edição ativa, limpa a tela
                            carregarLivros(); // Atualiza a lista removendo o item apagado
                        });
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={estilos.container}>
            <Text style={estilos.titulo}>📚 Painel CRUD Livraria (MySQL)</Text>

            {/* Acopla o componente de formulário repassando dados e gatilhos via Props */}
            <FormularioLivro
                titulo={titulo} setTitulo={setTitulo}
                autor={autor} setAutor={setAutor}
                preco={preco} setPreco={setPreco}
                estoque={estoque} setEstoque={setEstoque}
                idEdicao={idEdicao} salvarDados={salvarDados}
                limparFormulario={limparFormulario}
            />

            {/* Condicional que avalia o estado de carregamento assíncrono */}
            {carregando ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                // Listagem otimizada nativa para grandes volumes de registros mapeando o array vindo do banco de dados
                <FlatList
                    data={livros}
                    keyExtractor={(item) => item.id.toString()} // Garante chaves textuais únicas baseadas no ID incremental do MySQL
                    renderItem={({ item }) => (
                        // Invoca o componente visual de linha injetando o livro específico
                        <ItemLivro
                            item={item}
                            iniciarEdicao={iniciarEdicao}
                            excluirLivro={excluirLivro}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingTop: 10 },
    titulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }
});
