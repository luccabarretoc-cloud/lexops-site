const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

exports.handler = async (event) => {
  // 1. SEMPRE responder 200 para o teste de "ping" da Eduzz
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, body: "OK" };
  }

  try {
    const body = JSON.parse(event.body);

    // 2. Identificar se é Eduzz ou Kiwify
    const token = body.fatura_id || body.api_fatura_id || body.order_id;
    const email = body.cus_email || body.customer?.email || body.email;
    const status = body.fatura_status || body.order_status;

    // Se for apenas um teste da Eduzz (sem e-mail), responde OK e encerra
    if (!email && !token) {
      return { statusCode: 200, body: JSON.stringify({ message: "Teste recebido!" }) };
    }

    // 3. Salvar no Supabase (apenas se tiver dados reais)
    if (email && token && (status == 3 || status === "paid")) {
      const { error } = await supabase
        .from('usuarios_assinantes')
        .insert([{ email, token, status: 'pago' }]);

      if (error) throw error;
    }

    return { statusCode: 200, body: JSON.stringify({ status: "success" }) };

  } catch (err) {
    console.error("Erro:", err);
    // Mesmo com erro, retornamos 200 para a Eduzz não desativar o seu webhook
    return { statusCode: 200, body: JSON.stringify({ error: err.message }) };
  }
};