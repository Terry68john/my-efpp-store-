// Simple user state management
let currentUser = null;

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userGreeting = document.getElementById('user-greeting');

// Modal Control
function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  modal.style.display = show ? 'block' : 'none';
  document.body.style.overflow = show ? 'hidden' : '';
}

// Update UI based on auth state
function updateAuthUI() {
  if (currentUser) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    userGreeting.style.display = 'inline';
    logoutBtn.style.display = 'inline';
    userGreeting.textContent = `Hello, ${currentUser.name}`;
  } else {
    loginBtn.style.display = 'inline';
    registerBtn.style.display = 'inline';
    userGreeting.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

 // Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById('message-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm('message-form')) {
        const formData = {
          name: document.getElementById('contact-name').value,
          email: document.getElementById('contact-email').value,
          message: document.getElementById('contact-message').value,
          timestamp: new Date().toISOString(),
          userId: currentUser ? currentUser.email : 'guest'
        };
        
        console.log('Contact form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        
        document.getElementById('contact-message').value = '';
        if (!currentUser) {
          contactForm.reset();
        }
      }
    });
  }
  
  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
  
  // Directions Button
  const directionsBtn = document.querySelector('.directions-btn');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('This would open Google Maps with our location in a real implementation.');
    });
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Modal event listeners
  loginBtn.addEventListener('click', () => toggleModal('login-modal', true));
  registerBtn.addEventListener('click', () => toggleModal('register-modal', true));
  
  // Close buttons
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleModal('login-modal', false);
      toggleModal('register-modal', false);
    });
  });
  
  // Close when clicking outside modal
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      toggleModal('login-modal', false);
      toggleModal('register-modal', false);
    }
  });
  
  // Demo login
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    currentUser = {
      name: document.getElementById('login-email').value.split('@')[0],
      email: document.getElementById('login-email').value
    };
    updateAuthUI();
    toggleModal('login-modal', false);
    alert('Demo login successful!');
  });
  
  // Demo register
  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    currentUser = {
      name: document.getElementById('register-name').value,
      email: document.getElementById('register-email').value
    };
    updateAuthUI();
    toggleModal('register-modal', false);
    alert('Demo registration complete!');
  });
  
  // Logout
  logoutBtn.addEventListener('click', () => {
    currentUser = null;
    updateAuthUI();
  });
});