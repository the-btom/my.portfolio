// --- Typewriter Effect Script ---
document.addEventListener("DOMContentLoaded", function() {
    // Find the element to apply the typing effect to
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    // Get the words from the HTML data attribute and split them into an array
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // Speed of typing (in milliseconds)

    function type() {
        // Current word being typed
        const currentWord = words[wordIndex];
        
        // Text to display: slice the word based on charIndex
        const displayedText = isDeleting 
            ? currentWord.substring(0, charIndex - 1)
            : currentWord.substring(0, charIndex + 1);

        typingElement.textContent = displayedText;

        // Change speed based on typing or deleting
        typingSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing the word, now wait before deleting
            typingSpeed = 1500; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting the word, move to the next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 250; // Short pause before starting next word
        }
        
        charIndex += isDeleting ? -1 : 1;

        setTimeout(type, typingSpeed);
    }

    // Start the typing effect after a small delay
    setTimeout(type, 1000);
});