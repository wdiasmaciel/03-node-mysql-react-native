// Importa os componentes visuais nativos:
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
// Importa o tipo do livro:
import { InterfaceLivro } from '../interface/InterfaceLivro'; 

// Componente que renderiza o cartão visual de cada livro
export default function ItemLivro({ item, iniciarEdicao, excluirLivro }: PropriedadesItem) {
    return (
        // Transforma o cartão inteiro em um item clicável para ativar a alteração de dados (PUT)
        <TouchableOpacity style={estilos.cartao} onPress={() => iniciarEdicao(item)} activeOpacity={0.7}>
            {/* Seção superior contendo as strings de informação e o botão de descarte */}
            <View style={estilos.cabecalhoCartao}>
                <View style={{ flex: 1 }}>
                    <Text style={estilos.livroTitulo}>{item.titulo}</Text>
                    <Text style={estilos.livroAutor}>Por: {item.autor}</Text>
                </View>

                {/* Botão de exclusão isolado posicionado na lateral superior direita */}
                <TouchableOpacity style={estilos.botaoDeletar} onPress={() => excluirLivro(item.id)}>
                    <Text style={estilos.botaoDeletarTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>

            {/* Seção inferior exibindo o preço formatado e o total em estoque */}
            <View style={estilos.fileiraInfo}>
                <Text style={estilos.livroPreco}>R$ {Number(item.preco).toFixed(2)}</Text>
                <Text style={estilos.livroEstoque}>Estoque: {item.estoque}</Text>
            </View>

            {/* Mensagem discreta instruindo o aluno sobre a ação de toque na tela */}
            <Text style={estilos.dicaEdicao}>Toque para editar</Text>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    cartao: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 },
    cabecalhoCartao: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    livroTitulo: { fontSize: 16, fontWeight: 'bold' },
    livroAutor: { fontSize: 13, color: '#666' },
    botaoDeletar: { backgroundColor: '#d32f2f', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
    botaoDeletarTexto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    fileiraInfo: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 6 },
    livroPreco: { fontSize: 14, fontWeight: 'bold', color: '#2e7d32' },
    livroEstoque: { fontSize: 13, color: '#ed6c02' },
    dicaEdicao: { fontSize: 10, color: '#999', textAlign: 'right', marginTop: 4, fontStyle: 'italic' }
});
