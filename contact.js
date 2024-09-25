// Initialize EmailJS with your user ID
(function(){
    emailjs.init({
      publicKey: "W7pheFCPfxVktB0JD",
    });
 })();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    emailjs.send("service_71x0vcd", "template_x9of0al", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('responseMessage').innerText = "Message sent successfully!";
        document.getElementById('responseMessage').style.display = "block";
        document.getElementById('contactForm').reset(); // Clear the form
    }, function(error) {
        console.log('FAILED...', error);
        document.getElementById('responseMessage').innerText = "Failed to send message. Please try again.";
        document.getElementById('responseMessage').style.display = "block";
    });
});
