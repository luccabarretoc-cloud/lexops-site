const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // 1. Só aceita POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    const { email, nome } = JSON.parse(event.body);
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Salva o Lead no Banco
    const { error } = await supabase
      .from('leads_newsletter')
      .upsert({ email, nome }, { onConflict: 'email' });

    if (error) throw error;

    // 3. Retorna Sucesso + Link da Planilha
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Lead capturado!',
        downloadUrl: 'COLE_AQUI_O_LINK_DO_SEU_GOOGLE_DRIVE_OU_ARQUIVO' 
      }),
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};