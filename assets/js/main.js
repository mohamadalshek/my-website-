// Initialize the current slide index
let currentIdx = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
// Function to display a specific slide
function showSlide(index) {
    // Handle index out of bounds
    if (index >= slides.length) currentIdx = 0;
    if (index < 0) currentIdx = slides.length - 1;

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show the selected slide and activate its dot
    slides[currentIdx].classList.add('active');
    dots[currentIdx].classList.add('active');
}
// Function to move to next or previous slide
function changeSlide(step) {
    currentIdx += step;
    showSlide(currentIdx);
}
// Function to go to a specific slide using dots
function currentSlide(index) {
    currentIdx = index;
    showSlide(currentIdx);
}

// Set up auto-play timer (every 5 seconds)
setInterval(() => {
    changeSlide(1);
}, 5000);



// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Get search and filter elements
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const locationSelect = document.getElementById('locationSelect');
    const cards = document.querySelectorAll('.event-card');
    // Main filtering function
    function filterEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedLocation = locationSelect.value;
        // Loop through all cards to check conditions
        cards.forEach(card => {
            const name = card.querySelector('.event-name').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            const location = card.getAttribute('data-location');
            // Check if card matches search, category, and location
            const matchesSearch = name.includes(searchTerm);
            const matchesCategory = (selectedCategory === 'الكل' || category === selectedCategory);
            const matchesLocation = (selectedLocation === 'الكل' || location === selectedLocation);
            // Show or hide card based on results
            if (matchesSearch && matchesCategory && matchesLocation) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
    // Add event listeners for inputs
    searchInput.addEventListener('input', filterEvents);
    categorySelect.addEventListener('change', filterEvents);
    locationSelect.addEventListener('change', filterEvents);
});






// //////////////////////////////////////////////////////

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('categorySelect');
    const locationSelect = document.getElementById('locationSelect');
    const searchInput = document.getElementById('searchInput'); // جلب مربع البحث
    const eventCards = document.querySelectorAll('.event-card');

    // Check if elements exist to avoid errors
    if (categorySelect && locationSelect && eventCards.length > 0) {
        // Retrieve saved filter preferences from Local Storage
        const savedCategory = localStorage.getItem('preferredCategory') || 'الكل';
        const savedLocation = localStorage.getItem('preferredLocation') || 'الكل';

        categorySelect.value = savedCategory;
        locationSelect.value = savedLocation;

         // Main filtering logic
        function filterEvents() {
            const catValue = categorySelect.value;
            const locValue = locationSelect.value;
            
            const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

            eventCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardLocation = card.getAttribute('data-location');
                const cardName = card.querySelector('.event-name').innerText.toLowerCase();
                // Check matching conditions
                const matchCategory = (catValue === 'الكل' || cardCategory === catValue);
                const matchLocation = (locValue === 'الكل' || cardLocation === locValue);
                const matchSearch = cardName.includes(searchValue);
                // Show or hide card based on combined filters
                if (matchCategory && matchLocation && matchSearch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

         // Initial filter run on page load
        filterEvents();

        // Listen for changes and save to Local Storage
        categorySelect.addEventListener('change', () => {
            localStorage.setItem('preferredCategory', categorySelect.value);
            filterEvents();
        });

        locationSelect.addEventListener('change', () => {
            localStorage.setItem('preferredLocation', locationSelect.value);
            filterEvents();
        });

        // Add search input listener
        if (searchInput) {
            searchInput.addEventListener('input', filterEvents);
        }
    } 
}); 
