# 03-node-mysql-react-native

# Interação
Para que o seu app em React Native converse com o MySQL no Codespaces, você precisará de uma API (um back-end) no meio do caminho e precisará liberar uma porta pública no GitHub Codespaces.

---

# Funcionamento  
```text
[ App React Native ]  
        │  (Requisição HTTP / JSON)
        ▼
[ API Back-end: Node.js ] 
        │  (Conexão SQL Nativa)
        ▼
[ Banco de Dados MySQL ] 
```
---

# O que você precisa fazer para dar certo no Codespaces

Para que o aplicativo de celular (ou o emulador) consiga enxergar o seu back-end que está rodando dentro do Codespaces, siga estes passos:

## 1. Criar uma API simples no Codespaces

Você pode criar um servidor simples em `Node.js` (`Express`), dentro do mesmo repositório do Codespaces. 

Esse código vai se conectar ao `MySQL` localmente (usando `localhost` e a senha `root`) e vai expor rotas como `/clientes` ou `/livros`.

## 2. Tornar a porta da API PÚBLICA no GitHub

Por padrão, o Codespaces bloqueia qualquer acesso externo por segurança. 

Se a sua API estiver rodando na porta `3000`, por exemplo, você precisa liberá-la:

1. No VS Code do navegador, vá na aba `Ports` (Portas), que fica ao lado do Terminal.

2. Procure a linha da porta da sua API (ex: 3000).

3. Clique com o botão direito sobre ela, vá em `Port Visibility` (Visibilidade da Porta) e mude de `Private` para `Public`.

O `GitHub` vai te dar uma URL longa (ex: https://github.dev).

## 3. Chamar essa URL no React Native

No código do seu aplicativo React Native, você usará o comando `fetch` ou a biblioteca `axios` apontando para a URL gerada pelo `GitHub`:

```javascript
// Exemplo no React Native:
fetch('https://github.dev')
  .then(response => response.json())
  .then(data => console.log(data));
```
---

# Atualizar a Lista de Pacotes no Linux

Execute o comando abaixo para identificar atualizações de programas:
   ```bash
   sudo apt update
   ```

O comando `sudo apt update` atualiza a lista de pacotes disponíveis e suas versões nos repositórios configurados no seu sistema Linux.

## O que significa cada parte do comando?

`sudo`: executa o comando com permissões de administrador (`root`).

`apt`: é o gerenciador de pacotes usado em distribuições como Ubuntu, Debian e Mint. `APT` significa Advanced Package Tool (Ferramenta de Pacotes Avançada). Ele é o sistema que gerencia todos os programas do computador:
   1. Instala novos programas.
   2. Atualiza os softwares existentes.
   3. Remove aplicativos que você não quer mais.
   4. Resolve dependências, que significa instalar automaticamente outros arquivos e bibliotecas que um programa precisa para funcionar.
Antes do APT, os usuários precisavam baixar e compilar cada programa manualmente, o que era muito complexo. O APT automatizou todo esse processo.

`update`: conecta-se aos servidores oficiais para baixar as informações mais recentes sobre os programas disponíveis: 
   - Não atualiza o sistema: este comando não instala atualizações nos programas que já estão no seu computador.
   - Apenas verifica: ele apenas avisa o seu computador quais novas versões de programas existem.
   
# Instalar as Atualizações

Execute o comando abaixo para instalar as atualizações que foram encontradas:
   ```bash
   sudo apt upgrade
   ```
**OBS**: 
Para instalar o Node.js, basta eu executar `sudo apt update` e `sudo apt install -y nodejs`.

O `update` é obrigatório, porque ele atualiza a lista do sistema. Isso garante que o seu computador encontre o Node.js nos servidores e baixe a versão correta.

O `upgrade` serve apenas para atualizar os programas que já estão instalados no seu computador. Rodar esse comando apenas faria você perder tempo esperando todo o seu sistema ser atualizado antes de colocar o Node.js.

# Instalar o Node.js

Instale o Node.js com o comando abaixo:
   ```bash
   sudo apt install -y nodejs
   ```