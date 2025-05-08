
import { corsHeaders } from '../_shared/cors.ts';

const OPENCAGE_API_KEY = Deno.env.get("OPENCAGE_API_KEY") || "7a35945285cb4cc68c23a4aafd3e7255";

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { lat, lng } = await req.json();
    
    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=en`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      
      // Format the address in a user-friendly way
      const components = result.components;
      const formattedAddress = {
        fullAddress: result.formatted,
        street: components.road || components.street || '',
        neighbourhood: components.neighbourhood || components.suburb || '',
        city: components.city || components.town || components.village || '',
        state: components.state || '',
        postcode: components.postcode || '',
        country: components.country || '',
      };
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          address: formattedAddress 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No results found for this location" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
