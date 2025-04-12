// ESM syntax for compatibility with node-fetch v3
import fetch from 'node-fetch';

// Export the handler function
export const handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  console.log('Function invoked with HTTP method:', event.httpMethod);
  
  try {
    // Parse body
    let email = null;
    if (event.body) {
      try {
        const body = JSON.parse(event.body);
        email = body.email;
        console.log('Received email:', email);
      } catch (e) {
        console.log('Error parsing body:', e.message);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: 'Invalid request body'
          })
        };
      }
    }
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Email is required' 
        })
      };
    }
    
    // Get API key from environment
    const apiKey = process.env.CONVERTKIT_API_KEY;
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'API key not configured'
        })
      };
    }
    
    // Your ConvertKit form ID
    const formId = '7903890';
    
    // Prepare the request body
    const requestBody = JSON.stringify({
      api_key: apiKey,
      email: email
    });
    console.log('ConvertKit request body:', requestBody);
    
    // Make the request to ConvertKit
    console.log(`Sending subscription request to ConvertKit for email: ${email}`);
    
    try {
      // First attempt - using the form endpoint
      console.log('Trying ConvertKit form endpoint');
      const formUrl = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
      console.log('Request URL:', formUrl);
      
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
      
      console.log('ConvertKit API response status:', response.status);
      
      // Get response text
      const responseText = await response.text();
      console.log('ConvertKit API response body:', responseText);
      
      // Parse JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed JSON response:', JSON.stringify(data));
      } catch (err) {
        console.error('Error parsing ConvertKit response:', err);
        
        // If we can't parse the response, try a different endpoint
        if (response.status !== 200) {
          console.log('Trying alternative subscriber endpoint');
          
          // Try the subscriber direct endpoint
          const subscriberUrl = 'https://api.convertkit.com/v3/subscribers';
          console.log('Alternative URL:', subscriberUrl);
          
          const altResponse = await fetch(subscriberUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: apiKey,
              email: email,
              first_name: ''
            }),
          });
          
          console.log('Alternative endpoint status:', altResponse.status);
          const altText = await altResponse.text();
          console.log('Alternative endpoint response:', altText);
          
          if (altResponse.ok) {
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                success: true,
                message: 'Subscription successful via alternative endpoint',
                responseText: altText
              })
            };
          }
        }
        
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Invalid response from ConvertKit',
            details: responseText
          })
        };
      }
      
      // Check if subscription was successful
      if (response.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Subscription successful',
            subscriber: data.subscription ? data.subscription.subscriber : null
          })
        };
      } else {
        console.error('ConvertKit API error:', data);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: data.error || 'Error from ConvertKit API',
            details: data
          })
        };
      }
    } catch (fetchError) {
      console.error('Network error calling ConvertKit API:', fetchError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Network error calling ConvertKit API',
          details: fetchError.message
        })
      };
    }
  } catch (error) {
    console.error('General function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Server error',
        details: error.message
      })
    };
  }
};
