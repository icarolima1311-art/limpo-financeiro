import { useState } from 'react';
import './App.css';

function App() {
  // Nosso "interruptor". Começa em 'true' para mostrar a tela de Login primeiro.
  const [isLoginPage, setIsLoginPage] = useState(true);

  // Função para mudar para a tela de Cadastro
  const showRegisterPage = () => {
    setIsLoginPage(false);
  };

  // Função para mudar para a tela de Login
  const showLoginPage = () => {
    setIsLoginPage(true);
  };

  if (isLoginPage) {
    // Se o interruptor estiver em LOGIN, mostra este código:
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Limpo Financeiro</h1>
          <p>Seu dinheiro, suas regras.</p>
          <form>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="seuemail@exemplo.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="********" required />
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
          <p className="signup-link">
            Não tem uma conta? <a href="#" onClick={showRegisterPage}>Cadastre-se</a>
          </p>
        </div>
      </div>
    );
  } else {
    // Se o interruptor estiver em CADASTRO, mostra este código:
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Crie sua Conta</h1>
          <p>Rápido e fácil.</p>
          <form>
            <div className="input-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" placeholder="Seu nome completo" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="seuemail@exemplo.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Pelo menos 6 caracteres" required />
            </div>
            <button type="submit" className="login-button">Cadastrar</button>
          </form>
          <p className="signup-link">
            Já tem uma conta? <a href="#" onClick={showLoginPage}>Faça Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;