
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
    
    console.log(`Reverse geocoding coordinates: ${lat}, ${lng}`);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=en&pretty=1`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OpenCage API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("OpenCage API response:", JSON.stringify(data));
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      
      // Format the address in a user-friendly way
      const components = result.components;
      const formattedAddress = {
        fullAddress: result.formatted,
        street: components.road || components.street || '',
        neighbourhood: components.suburb || components.neighbourhood || components.district || '',
        city: components.city || components.town || components.village || '',
        state: components.state || '',
        postcode: components.postcode || '',
        country: components.country || '',
      };
      
      // Create a user-friendly display address
      let displayAddress = '';
      
      if (components.suburb || components.neighbourhood || components.district) {
        displayAddress += components.suburb || components.neighbourhood || components.district;
      }
      
      if (components.city || components.town || components.village) {
        const cityPart = components.city || components.town || components.village;
        displayAddress += displayAddress ? `, ${cityPart}` : cityPart;
      }
      
      if (!displayAddress && components.state) {
        displayAddress = components.state;
      }
      
      if (!displayAddress) {
        displayAddress = result.formatted;
      }
      
      console.log("Formatted address:", displayAddress);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          address: formattedAddress,
          displayAddress
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      console.error("No results found for location");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No results found for this location" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
