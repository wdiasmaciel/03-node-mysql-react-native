// Importa componente visual nativo:
import { Alert } from 'react-native';

// OPERAÇÃO DELETE (DELETE): remoção física de registro baseada no ID.
export function excluirLivro(id: number, URL_DA_API: string): Promise<boolean> {
    return new Promise((resolve) => {
        // Alerta nativo de dupla confirmação do dispositivo móvel para evitar cliques acidentais:
        Alert.alert('Confirmar Exclusão', 'Deseja realmente apagar este registro do banco de dados?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const resposta = await fetch(`${URL_DA_API}/${id}`, { method: 'DELETE' }); // Dispara o verbo DELETE direcionando ao ID específico.

                        if (!resposta.ok) {
                            throw new Error('Erro ao excluir o livro.');
                        }

                        Alert.alert('Removido!', 'O registro foi removido do MySQL.');

                        resolve(true); // Retorna sucesso da operação.

                    } catch (error) {
                        Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir o registro.');
                        resolve(false); // Retorna falha da operação.
                    }
                },
            },
        ]
        );
    });
}
