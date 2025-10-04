// src/Auth.jsx

import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showRegisterPage = () => setIsLoginPage(false);
  const showLoginPage = () => setIsLoginPage(true);

  async function handleRegister(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { full_name: name } }
    });
    if (error) {
      alert("Erro ao cadastrar: " + error.message);
    } else {
      alert("Cadastro realizado! Verifique seu e-mail para confirmação.");
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert("Erro no login: " + error.message);
    }
    // O login bem-sucedido será detectado pelo App.jsx e a tela vai mudar
  }

  if (isLoginPage) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Limpo Financeiro</h1>
          <p>Seu dinheiro, suas regras.</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Crie sua Conta</h1>
          <p>Rápido e fácil.</p>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="name">Nome</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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