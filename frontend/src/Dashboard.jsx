// src/Dashboard.jsx

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  async function getExpenses() {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) console.error('Erro ao buscar despesas:', error.message);
    else setExpenses(data);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleAddExpense(event) {
    event.preventDefault();
    const { error } = await supabase.from('expenses').insert({ description, amount, category });
    if (error) alert("Erro ao adicionar despesa: " + error.message);
    else {
      setDescription('');
      setAmount('');
      setCategory('');
      getExpenses(); 
    }
  }

  // NOVA FUNÇÃO PARA DELETAR
  async function handleDelete(id) {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) {
      alert("Erro ao deletar despesa: " + error.message);
    } else {
      getExpenses(); // Atualiza a lista na tela
    }
  }

  return (
    <div className="login-container">
      <div className="login-box" style={{ textAlign: 'left', width: '600px', maxWidth: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Dashboard</h1>
          <button onClick={handleLogout} style={{ height: '40px' }}>
            Sair
          </button>
        </div>
        <p>Bem-vindo, {user.email}!</p>
        
        <hr />

        <h2>Adicionar Nova Despesa</h2>
        <form onSubmit={handleAddExpense} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input type="text" placeholder="Descrição (ex: Jantar)" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="number" placeholder="Valor (ex: 50)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <input type="text" placeholder="Categoria (ex: Alimentação)" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <button type="submit">Adicionar</button>
        </form>

        <hr />

        <h2>Suas Despesas</h2>
        {expenses.length === 0 ? (
          <p>Você ainda não tem despesas cadastradas.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {expenses.map((expense) => (
              <li key={expense.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <span>
                  <strong>{expense.description}</strong> - R$ {expense.amount} 
                  <em style={{ marginLeft: '10px', color: '#666' }}>({expense.category})</em>
                </span>
                {/* BOTÃO DE DELETAR ADICIONADO AQUI */}
                <button onClick={() => handleDelete(expense.id)} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}