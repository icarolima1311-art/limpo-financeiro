// src/App.jsx

import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  // Guarda a sessão do usuário. Começa como 'null' (deslogado)
  const [session, setSession] = useState(null)

  // Este é um "espião" que roda quando o app carrega
  useEffect(() => {
    // 1. Pede ao Supabase a sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 2. Fica "escutando" por mudanças de login/logout
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    // Esta é a grande decisão:
    // Se NÃO tiver sessão, mostra o componente <Auth />
    // Se TIVER sessão, mostra o componente <Dashboard />
    <div>
      {!session ? <Auth /> : <Dashboard key={session.user.id} user={session.user} />}
    </div>
  )
}

export default App