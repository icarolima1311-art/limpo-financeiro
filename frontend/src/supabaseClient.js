import { createClient } from '@supabase/supabase-js'

// Sua URL e Chave Anon Public, prontas para usar
const supabaseUrl = 'https://uhrpmrzbgspaqdewymkp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocnBtcnpiZ3NwYXFkZXd5bWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjQ4NDIsImV4cCI6MjA3NTEwMDg0Mn0.9fsvraz9UTCYpo-L8dbNrEeL_DPG1nAnjNkaX8PlH1I'

export const supabase = createClient(supabaseUrl, supabaseKey)