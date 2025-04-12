// CommonJS syntax for Netlify Functions compatibility
const axios = require('axios');

// Use CommonJS exports
exports.handler = async (event) => {
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
    
    // Prepare the request data
    const requestData = {
      api_key: apiKey,
      email: email
    };
    console.log('ConvertKit request data:', JSON.stringify(requestData));
    
    // Make the request to ConvertKit
    console.log(`Sending subscription request to ConvertKit for email: ${email}`);
    
    try {
      // First attempt - using the form endpoint
      console.log('Trying ConvertKit form endpoint');
      const formUrl = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
      console.log('Request URL:', formUrl);
      
      try {
        const response = await axios.post(formUrl, requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('ConvertKit API response status:', response.status);
        console.log('ConvertKit API response data:', JSON.stringify(response.data));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Subscription successful',
            subscriber: response.data.subscription ? response.data.subscription.subscriber : null
          })
        };
      } catch (formError) {
        console.error('Form endpoint error:', formError.message);
        
        // If form endpoint fails, try the subscriber endpoint
        console.log('Trying alternative subscriber endpoint');
        const subscriberUrl = 'https://api.convertkit.com/v3/subscribers';
        console.log('Alternative URL:', subscriberUrl);
        
        try {
          const altResponse = await axios.post(subscriberUrl, {
            ...requestData,
            first_name: ''
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          console.log('Alternative endpoint status:', altResponse.status);
          console.log('Alternative endpoint data:', JSON.stringify(altResponse.data));
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: 'Subscription successful via alternative endpoint',
              subscriber: altResponse.data.subscriber
            })
          };
        } catch (altError) {
          console.error('Alternative endpoint error:', altError.message);
          
          // If we have response data from the original error, return that
          if (formError.response) {
            console.log('Original error response:', JSON.stringify(formError.response.data));
            return {
              statusCode: formError.response.status || 400,
              headers,
              body: JSON.stringify({
                success: false,
                error: 'Error from ConvertKit API',
                details: formError.response.data
              })
            };
          }
          
          // Otherwise return the alternative endpoint error
          if (altError.response) {
            return {
              statusCode: altError.response.status || 400,
              headers,
              body: JSON.stringify({
                success: false,
                error: 'Error from ConvertKit API',
                details: altError.response.data
              })
            };
          }
          
          // If no response data is available, return a generic error
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: 'Error communicating with ConvertKit API',
              formError: formError.message,
              altError: altError.message
            })
          };
        }
      }
    } catch (networkError) {
      console.error('Network error calling ConvertKit API:', networkError.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Network error calling ConvertKit API',
          details: networkError.message
        })
      };
    }
  } catch (error) {
    console.error('General function error:', error.message);
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
