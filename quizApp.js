document.getElementById('startQuiz').addEventListener('click', function() {
    // Scroll to the bottom of the page smoothly
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

document.getElementById('startButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const nameInput = document.querySelector('input[type="text"]');

    if (nameInput.value.trim() === '') {
        alert('Please input your name');
    } else {
        // Store the name in localStorage or sessionStorage
        localStorage.setItem('userName', nameInput.value);
        
        // Clear the input field (optional)
        nameInput.value = '';

        // Redirect to the quiz page
        window.location.href = '/readQuizIn.html';
    }
});

// Function to check the screen size and reset the overlay
function checkScreenSize() {
    const overlay = document.getElementById('overlay');
    if (window.innerWidth > 768) { // Adjust this value based on your breakpoint
        overlay.style.opacity = 0; // Hide the overlay
        overlay.style.pointerEvents = 'none'; // Disable interaction
        isDarkGold = false; // Reset the toggle state
    }
}

// Event listener for window resize
window.addEventListener('resize', checkScreenSize);

// Existing code to toggle overlay
const mobileToggle = document.getElementById('mobileToggle');
let isDarkGold = false;

mobileToggle.addEventListener('click', function() {
    const overlay = document.getElementById('overlay');
    if (!isDarkGold) {
        overlay.style.opacity = 1; // Show overlay
        overlay.style.pointerEvents = 'auto'; // Enable interaction
    } else {
        overlay.style.opacity = 0; // Hide overlay
        overlay.style.pointerEvents = 'none'; // Disable interaction
    }
    isDarkGold = !isDarkGold; // Update the state
});

// Initial check to set the correct overlay state on load
checkScreenSize();
