// Function to toggle between login and register forms
function toggleForm() {
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.querySelector('.register-box');
    
    // Toggle visibility of forms
    loginBox.classList.toggle('active');
    registerBox.classList.toggle('active');
    
    // If login is visible, hide register, and vice versa
    if (loginBox.classList.contains('active')) {
      loginBox.style.display = 'none';
      registerBox.style.display = 'block';
    } else {
      loginBox.style.display = 'block';
      registerBox.style.display = 'none';
    }
  }
  
  // Function to handle the registration of a new user
  function registerUser(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Get form values
    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
    // Save the registration details to localStorage (simple implementation)
    const user = { username, email, password };
    localStorage.setItem(username, JSON.stringify(user));
  
    alert("Registration Successful! Please login.");
    toggleForm(); // Switch back to the login form after registration
  }
  
  // Function to handle the login process
  function loginUser(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Get form values
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
    // Retrieve the user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem(username));
  
    // Check if user exists and passwords match
    if (storedUser && storedUser.password === password) {
      alert("Login Successful!");
      window.location.href = 'index.html'; // Redirect to index.html upon successful login
    } else {
      alert("Invalid Username or Password.");
    }
  }
  
  // Attach event listeners to forms
  document.querySelector('.login-box form').addEventListener('submit', loginUser);
  document.querySelector('.register-box form').addEventListener('submit', registerUser);
  