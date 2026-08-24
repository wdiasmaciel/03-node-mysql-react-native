// Importa os componentes visuais nativos:
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
// Importa a interface para propriedades do livro:
import { PropriedadesLivro } from '../interface/PropriedadesLivro'; 

// Componente que renderiza o cartão visual de cada livro:
export default function ItemLivro(props: PropriedadesLivro) {
    return (
        // Transforma o cartão inteiro em um item clicável para ativar a alteração de dados (PUT):
        <TouchableOpacity 
            style={estilos.cartao} 
            onPress={() => props.iniciarEdicao(props.item)} 
            activeOpacity={0.7}
        >
            {/* Seção superior contendo as strings de informação e o botão de descarte: */}
            <View style={estilos.cabecalhoCartao}>
                <View style={{ flex: 1 }}>
                    <Text style={estilos.livroTitulo}>{props.item.titulo}</Text>
                    <Text style={estilos.livroAutor}>Por: {props.item.autor}</Text>
                </View>

                {/* Botão de exclusão isolado posicionado na lateral superior direita: */}
                <TouchableOpacity 
                    style={estilos.botaoDeletar} 
                    onPress={() => {
                        if (props.item.id !== undefined) {
                            props.excluirLivro(props.item.id);
                        }
                    }}
                >
                    <Text style={estilos.botaoDeletarTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>

            {/* Seção inferior exibindo o preço formatado e o total em estoque: */}
            <View style={estilos.fileiraInfo}>
                <Text style={estilos.livroPreco}>R$ {Number(props.item.preco).toFixed(2)}</Text>
                <Text style={estilos.livroEstoque}>Estoque: {props.item.estoque}</Text>
            </View>

            {/* Mensagem discreta instruindo sobre a ação de toque na tela para editar:*/}
            <Text style={estilos.dicaEdicao}>Toque para editar</Text>
        </TouchableOpacity>
    );
}

// Estilos:
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
