// Importa componente visual nativo:
import { Alert, Platform } from 'react-native';

/*
 * Nesta função, a Promise é necessária, porque Alert.alert é assíncrono: 
 * a função precisa esperar o usuário escolher Excluir ou Cancelar antes 
 * de continuar. Sem a Promise, o fetch poderia ser executado antes da 
 * confirmação, ou o carregar() poderia ocorrer antes da exclusão terminar.
 */

// OPERAÇÃO DELETE (DELETE): remoção física de registro baseada no ID.
export async function excluirLivro(id: number, URL_DA_API: string): Promise<boolean> {
    const mensagem = 'Deseja realmente apagar este registro do banco de dados?';

    if (Platform.OS === 'web') {
        if (!window.confirm(mensagem)) {
            return false;
        }
    } else {
        const confirmado = await new Promise<boolean>((resolve) => {
            // Alerta nativo de dupla confirmação do dispositivo móvel para evitar cliques acidentais:
            Alert.alert('Confirmar Exclusão', mensagem, [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => resolve(false), // Retorna falha da operação.
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => resolve(true),  // Retorna sucesso da operação.
                },
            ]);
        });

        if (!confirmado) {
            return false;
        }
    }

    try {
        // Dispara o verbo DELETE direcionando ao ID específico.
        const resposta = await fetch(`${URL_DA_API}/${id}`, {
            method: 'DELETE',
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        if (Platform.OS === 'web') {
            window.alert('O registro foi removido do Banco de Dados MySQL.');
        } else {
            Alert.alert('Removido!', 'O registro foi removido do Banco de Dados MySQL.');
        }

        return true;
    } catch {
        if (Platform.OS === 'web') {
            window.alert('Ocorreu um erro ao excluir o registro.');
        } else {
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o registro.');
        }

        return false;
    }
}
