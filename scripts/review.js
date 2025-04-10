document.addEventListener('DOMContentLoaded', function() {
    // Get the counter element
    const counterElement = document.getElementById('reviewCounter');
    
    // Get the current count from localStorage or initialize to 0
    let reviewCount = localStorage.getItem('reviewCount') || 0;
    
    // Increment the count
    reviewCount++;
    
    // Update localStorage
    localStorage.setItem('reviewCount', reviewCount);
    
    // Display the updated count
    counterElement.textContent = reviewCount;
    
    // Parse URL parameters to display submitted data (optional)
    const urlParams = new URLSearchParams(window.location.search);
    // You could display the submitted data here if desired
});