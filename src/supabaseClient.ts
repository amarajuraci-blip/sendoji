// amarajuraci-blip/sendoji/sendoji-5d31049582b4141029842a01bf9e35e78ed4a186/src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Esta é a versão segura e correta para a publicação:
// Ele lê as chaves das "Variáveis de Ambiente" (do Netlify ou do seu arquivo .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Esta verificação garante que o site não carregue se as chaves não forem encontradas
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Erro: Variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_KEY não estão definidas!");
}

// Isso exporta o cliente Supabase para os outros arquivos usarem
export const supabase = createClient(supabaseUrl, supabaseKey)