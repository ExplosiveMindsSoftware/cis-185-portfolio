// Wait for the HTML document to finish loading before running the script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Select the form element from the page
    // We need to give your form an ID in the HTML first. Let's call it 'contact-form'
    const contactForm = document.getElementById('contact-form');

    // 2. Add an event listener to run code when the form is submitted
    contactForm.addEventListener('submit', (event) => {
        
        // 3. Get the current values from the input fields
        // .trim() removes any extra whitespace from the beginning or end
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // 4. Check if the fields are empty
        if (name === '' || email === '' || message === '') {
            
            // 5. If anything is empty, show an alert to the user
            alert('Please fill out all fields (Name, Email, and Message) before submitting.');
            
            // 6. STOP the form from actually submitting and reloading the page
            event.preventDefault(); 
        } else {
            // Optional: If the form is valid, you could show a success message
            // For now, we'll just let it submit (which will just reload the page)
            alert('Thank you for your message!');
        }
    });
});