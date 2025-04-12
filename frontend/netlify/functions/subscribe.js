// Simplified function to test deployment
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
  
  try {
    // Log details for debugging
    console.log('Function invoked with HTTP method:', event.httpMethod);
    console.log('API Key exists:', !!process.env.CONVERTKIT_API_KEY);
    
    // Parse body if it exists
    let email = null;
    if (event.body) {
      try {
        const body = JSON.parse(event.body);
        email = body.email;
        console.log('Received email:', email);
      } catch (e) {
        console.log('Error parsing body:', e.message);
      }
    }
    
    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Test function successful',
        receivedEmail: email,
        apiKeyExists: !!process.env.CONVERTKIT_API_KEY
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
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
