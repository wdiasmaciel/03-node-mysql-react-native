// Importa a biblioteca base do React:
import React from 'react';
// Importa os componentes visuais nativos:
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// Importa a interface para livros do Banco de Dados MySQL:
import { InterfaceLivro } from '../interface/InterfaceLivro'

// Declara o componente aplicando a tipagem na propriedade recebida:
export default function FormularioLivro(livro: InterfaceLivro) {
    return (
        // Agrupa os elementos visuais e aplica um estilo extra de cor laranja caso esteja editando:
        <View style={[estilos.formulario, idEdicao !== null && estilos.formularioEdicao]}>
            {/* Altera o texto do cabeçalho de acordo com o estado de edição */}
            <Text style={estilos.formularioTitulo}>
                {idEdicao !== null ? "✏️ Editando Registro" : "🆕 Novo Livro"}
            </Text>

            {/* Campo de captura para o Título do livro */}
            <TextInput
                style={estilos.entradaTexto}
                placeholder="Título do Livro"
                value={titulo}
                onChangeText={setTitulo}
            />

            {/* Campo de captura para o Autor do livro */}
            <TextInput
                style={estilos.entradaTexto}
                placeholder="Autor"
                value={autor}
                onChangeText={setAutor}
            />

            {/* Caixa de layout horizontal para acomodar preço e estoque lado a lado */}
            <View style={estilos.fileiraCampos}>
                <TextInput
                    style={[estilos.entradaTexto, { flex: 1, marginRight: 8 }]}
                    placeholder="Preço"
                    keyboardType="numeric"
                    value={preco}
                    onChangeText={setPreco}
                />
                <TextInput
                    style={[estilos.entradaTexto, { flex: 1 }]}
                    placeholder="Estoque"
                    keyboardType="numeric"
                    value={estoque}
                    onChangeText={setEstoque}
                />
            </View>

            {/* Área inferior destinada aos botões de ação do CRUD */}
            <View style={estilos.fileiraAcoes}>
                {/* Botão principal para gravação ou modificação de dados no MySQL */}
                <TouchableOpacity
                    style={[estilos.botao, idEdicao !== null ? estilos.botaoLaranja : estilos.botaoVerde]}
                    onPress={salvarDados}
                >
                    <Text style={estilos.botaoTexto}>
                        {idEdicao !== null ? "Atualizar no MySQL" : "Salvar no MySQL"}
                    </Text>
                </TouchableOpacity>

                {/* Renderização condicional: exibe o botão de cancelar apenas se idEdicao for ativo */}
                {idEdicao !== null && (
                    <TouchableOpacity style={estilos.botaoCancelar} onPress={limparFormulario}>
                        <Text style={estilos.cancelarTexto}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

// Centralização de estilos com nomes puramente em português
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
