import { createClient } from '@supabase/supabase-js'

// Lê a URL e a Chave do arquivo .env.local de forma segura
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cria e exporta a conexão com o Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)