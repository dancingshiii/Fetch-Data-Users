/**
 * Fetches user data from a public API and displays it on the webpage
 * Uses async/await for asynchronous operations with error handling
 */

// Base URL for the JSONPlaceholder API
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Main function to fetch and display user data
 * Uses async/await pattern for handling asynchronous operations
 */
async function fetchAndDisplayUsers() {
    // Get references to DOM elements
    const userListElement = document.getElementById('userList');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    try {
        // Show loading indicator and clear previous content
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        userListElement.innerHTML = '';
        
        // Fetch data from the API with error handling for network issues
        const response = await fetch(API_URL);
        
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const users = await response.json();
        
        // Hide loading indicator
        loadingElement.classList.add('hidden');
        
        // Display the users
        displayUsers(users, userListElement);
        
    } catch (error) {
        // Handle any errors that occurred during fetch or processing
        loadingElement.classList.add('hidden');
        errorElement.classList.remove('hidden');
        errorElement.textContent = `Error fetching user data: ${error.message}`;
        
        // Log error to console for debugging
        console.error('Fetch error:', error);
    }
}

/**
 * Displays user data in the DOM
 * @param {Array} users - Array of user objects from the API
 * @param {HTMLElement} container - DOM element to display users in
 */
function displayUsers(users, container) {
    // Check if users array is valid and not empty
    if (!users || users.length === 0) {
        container.innerHTML = '<p class="error">No users found.</p>';
        return;
    }
    
    // Create HTML for each user
    const usersHTML = users.map(user => {
        // Extract required data with fallback for missing properties
        const name = user.name || 'N/A';
        const email = user.email || 'N/A';
        const city = user.address?.city || 'N/A'; // Optional chaining for nested property
        
        // Create user card HTML
        return `
            <div class="user-card">
                <h3>${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>City:</strong> ${city}</p>
            </div>
        `;
    }).join('');
    
    // Insert user cards into container
    container.innerHTML = usersHTML;
}

// Add event listener to automatically fetch users when page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayUsers);
