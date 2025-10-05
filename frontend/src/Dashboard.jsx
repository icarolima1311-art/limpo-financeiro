// src/Dashboard.jsx

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  
  // AQUI ESTÁ A MUDANÇA NO TEXTO
  const [analysisResult, setAnalysisResult] = useState("Clique em 'Gerar Análise Financeira' para ver uma demonstração. (Feature em desenvolvimento)");

  async function getExpenses() {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) console.error('Erro ao buscar despesas:', error.message);
    else setExpenses(data);
  }

  useEffect(() => { getExpenses(); }, []);

  async function handleLogout() { await supabase.auth.signOut(); }

  async function handleAddExpense(event) {
    event.preventDefault();
    const { error } = await supabase.from('expenses').insert({ description, amount, category });
    if (error) alert("Erro: " + error.message);
    else {
      setDescription(''); setAmount(''); setCategory('');
      getExpenses();
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) alert("Erro: " + error.message);
    else getExpenses();
  }

  async function handleUpdate(id) {
    const { error } = await supabase.from('expenses').update({ description: editingText }).eq('id', id);
    if (error) alert("Erro: " + error.message);
    else {
      setEditingId(null);
      getExpenses();
    }
  }

  async function handleGenerateAnalysis() {
    setLoadingAnalysis(true);
    setAnalysisResult('');
    console.log("MODO DE EMERGÊNCIA: 'Mockando' a resposta da IA.");
    const mockResponse = `Olá! Analisei suas despesas e aqui vai um resumo rápido:\n\nSeu principal gasto no momento parece ser com **Alimentação**, onde você gastou um total significativo. É comum que essa categoria ocupe uma parte importante do orçamento mensal.\n\nUma dica prática para o próximo mês seria tentar planejar as refeições da semana com antecedência. Isso pode ajudar a reduzir gastos impulsivos com delivery e restaurantes, gerando uma boa economia no final do mês sem que você precise abrir mão de comer bem.`;
    setTimeout(() => {
      setAnalysisResult(mockResponse);
      setLoadingAnalysis(false);
    }, 2500);
  }
  
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const transactionCount = expenses.length;

  return (
    <div className="login-container">
      <div className="login-box" style={{ width: '100%', maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Bem-vindo, {user.user_metadata.full_name}!</h1>
          <button onClick={handleLogout} style={{ height: '40px' }}>Sair</button>
        </div>
        <p>Logado como: {user.email}</p>
        
        <div className="summary-container">
          <div className="summary-card">
            <h2>Total Gasto</h2>
            <span>R$ {totalSpent.toFixed(2)}</span>
          </div>
          <div className="summary-card">
            <h2>Transações</h2>
            <span>{transactionCount}</span>
          </div>
        </div>
        
        <hr />
        <h2>Adicionar Nova Despesa</h2>
        <form onSubmit={handleAddExpense} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="number" placeholder="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <button type="submit">Adicionar</button>
        </form>
        <hr />
        <h2>Suas Despesas</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {expenses.map((expense) => (
            <li key={expense.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '10px 0' }}>
              {editingId === expense.id ? (
                <>
                  <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                  <div>
                    <button onClick={() => handleUpdate(expense.id)}>Salvar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <span>
                    <strong>{expense.description}</strong> - R$ {expense.amount} 
                    <em style={{ marginLeft: '10px', color: '#666' }}>({expense.category})</em>
                  </span>
                  <div>
                    <button onClick={() => { setEditingId(expense.id); setEditingText(expense.description); }}>Editar</button>
                    <button onClick={() => handleDelete(expense.id)} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', marginLeft: '5px' }}>X</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <hr />
        <h2>Análise Financeira com IA</h2>
        <button onClick={handleGenerateAnalysis} disabled={loadingAnalysis || expenses.length === 0}>
          {loadingAnalysis ? 'Analisando...' : 'Gerar Análise Financeira'}
        </button>
        {analysisResult && (
          <div className="analysis-box">
            <strong>Resultado da Análise:</strong>
            <p>{analysisResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}