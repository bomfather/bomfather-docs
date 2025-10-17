// This function runs when a form submission is created
exports.handler = async function(event, context) {
  // Get the form data
  const { payload } = JSON.parse(event.body);
  
  console.log("Form submission received:", payload);
  
  // Here you could add additional logic like:
  // - Sending an email notification
  // - Storing the data in a database
  // - Custom validation
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Form submission received" })
  };
}; 