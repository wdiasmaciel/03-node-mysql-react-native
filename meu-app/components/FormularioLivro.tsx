// Importa os componentes visuais nativos:
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// Importa a interface para propriedades do formulário:
import { PropriedadesFormulario } from '../interface/PropriedadesFormulario'

// Declara o componente aplicando a tipagem na propriedade recebida:
export default function FormularioLivro(props: PropriedadesFormulario) {
    return (
        // Agrupa os elementos visuais e aplica um estilo extra de cor laranja caso esteja editando:
        <View style={[estilos.formulario, props.idEdicao !== null && estilos.formularioEdicao]}>
            {/* Altera o texto do cabeçalho de acordo com o estado de edição: */}
            <Text style={estilos.formularioTitulo}>
                {props.idEdicao !== null ? "Editando Registro" : "Novo Livro"}
            </Text>

            {/* Campo de captura para o título do livro: */}
            <TextInput
                style={estilos.entradaTexto}
                placeholder="Título do Livro"
                value={props.titulo}
                onChangeText={props.setTitulo}
            />

            {/* Campo de captura para o autor do livro: */}
            <TextInput
                style={estilos.entradaTexto}
                placeholder="Autor"
                value={props.autor}
                onChangeText={props.setAutor}
            />

            {/* Caixa de layout horizontal para acomodar preço e estoque lado a lado: */}
            <View style={estilos.fileiraCampos}>
                <TextInput
                    style={[estilos.entradaTexto, { flex: 1, marginRight: 8 }]}
                    placeholder="Preço"
                    keyboardType="numeric"
                    value={props.preco}
                    onChangeText={props.setPreco}
                />
                <TextInput
                    style={[estilos.entradaTexto, { flex: 1 }]}
                    placeholder="Estoque"
                    keyboardType="numeric"
                    value={props.estoque}
                    onChangeText={props.setEstoque}
                />
            </View>

            {/* Área inferior destinada aos botões de ação do CRUD: */}
            <View style={estilos.fileiraAcoes}>
                {/* Botão principal para gravação ou modificação de dados no MySQL: */}
                <TouchableOpacity
                    style={[estilos.botao, props.idEdicao !== null ? estilos.botaoLaranja : estilos.botaoVerde]}
                    onPress={props.salvarDados}
                >
                    <Text style={estilos.botaoTexto}>
                        {props.idEdicao !== null ? "Atualizar no MySQL" : "Salvar no MySQL"}
                    </Text>
                </TouchableOpacity>

                {/* Renderização condicional: exibe o botão de cancelar apenas se idEdicao for ativo: */}
                {props.idEdicao !== null && (
                    <TouchableOpacity style={estilos.botaoCancelar} onPress={props.limparFormulario}>
                        <Text style={estilos.cancelarTexto}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

// Estilos:
const estilos = StyleSheet.create({
    formulario: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, elevation: 2, borderWidth: 1, borderColor: '#eee' },
    formularioEdicao: { borderColor: '#ed6c02', backgroundColor: '#fffbf7' },
    formularioTitulo: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 8 },
    entradaTexto: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 5, marginBottom: 8 },
    fileiraCampos: { flexDirection: 'row' },
    fileiraAcoes: { flexDirection: 'row', marginTop: 4 },
    botao: { flex: 2, padding: 12, borderRadius: 5, alignItems: 'center' },
    botaoVerde: { backgroundColor: '#2e7d32' },
    botaoLaranja: { backgroundColor: '#ed6c02' },
    botaoCancelar: { flex: 1, backgroundColor: '#777', padding: 12, borderRadius: 5, alignItems: 'center', marginLeft: 8 },
    botaoTexto: { color: '#fff', fontWeight: 'bold' },
    cancelarTexto: { color: '#fff', fontWeight: 'bold' }
});
