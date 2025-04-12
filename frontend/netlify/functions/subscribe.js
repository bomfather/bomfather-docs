import fetch from 'node-fetch';

export const handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Email is required' }) };
    }

    // Your ConvertKit form ID
    const formId = '7903890';
    const apiKey = process.env.CONVERTKIT_API_KEY;
    
    // Make sure we have the API key
    if (!apiKey) {
      console.error('Missing CONVERTKIT_API_KEY environment variable');
      return { 
        statusCode: 500, 
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        }) 
      };
    }
    
    console.log(`Attempting to subscribe email to form ${formId}`);
    
    // Submit to ConvertKit API
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email
      }),
    });

    const data = await response.json();
    console.log('ConvertKit API response status:', response.status);
    console.log('ConvertKit API response body:', JSON.stringify(data));

    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Subscription successful'
        })
      };
    } else {
      console.error('ConvertKit API error:', data);
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          error: data.error || 'Error subscribing to newsletter' 
        })
      };
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Server error processing subscription'
      })
    };
  }
};
