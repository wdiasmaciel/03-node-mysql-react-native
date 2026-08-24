// Importa componente visual nativo:
import { Alert } from 'react-native';

// OPERAÇÃO DELETE (DELETE): remoção física de registro baseada no ID.
export function excluirLivro(id: number, URL_DA_API: string) {
    // Alerta nativo de dupla confirmação do dispositivo móvel para evitar cliques acidentais:
    Alert.alert('Confirmar Exclusão', 'Deseja realmente apagar este registro do banco de dados?', [
        { text: 'Cancelar', style: 'cancel' },
        {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
                await fetch(`${URL_DA_API}/${id}`, { method: 'DELETE' }) // Dispara o verbo DELETE direcionando ao ID específico.
                    .then(() => {
                        Alert.alert('Removido!', 'O registro foi removido do MySQL.');
                    });
            },
        },
    ]);
};
