import './App.css';

function App() {
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
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  )
}

export default App;