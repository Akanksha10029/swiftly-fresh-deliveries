
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, user_id } = await req.json()

    // Simple AI response logic (in a real app, you'd connect to OpenAI or another AI service)
    let aiResponse = "I'm your shopping assistant. How can I help you today?"
    
    if (message.toLowerCase().includes("order")) {
      aiResponse = "I can help you with your orders. Would you like to track an existing order or place a new one?"
    } else if (message.toLowerCase().includes("emergency")) {
      aiResponse = "For emergency products, check our Emergency & Midnight Essentials section. We deliver 24/7 within 15-30 minutes."
    } else if (message.toLowerCase().includes("delivery")) {
      aiResponse = "We offer express delivery within 30 minutes for most orders, and 24/7 delivery for emergency essentials."
    }

    // In a production app, you would save this interaction to the chat_history table
    
    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
