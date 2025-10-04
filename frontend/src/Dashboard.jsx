// src/Dashboard.jsx

import { supabase } from './supabaseClient';

export default function Dashboard({ user }) {
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    // O logout será detectado pelo App.jsx e a tela vai mudar de volta
  }

  return (
    <div className="login-container"> {/* Vamos reusar o CSS por enquanto */}
      <div className="login-box">
        <h1>Bem-vindo, {user.email}!</h1>
        <p>Você está na sua tela principal.</p>
        <p>Em breve, aqui você verá suas despesas.</p>
        <button onClick={handleLogout} className="login-button">
          Sair (Logout)
        </button>
      </div>
    </div>
  );
}