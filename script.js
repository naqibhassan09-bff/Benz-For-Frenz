
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 2. Interactive Catalog Category Filter (Models & Services)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogItems = document.querySelectorAll('.catalog-item');

  function filterCatalog(category) {
    catalogItems.forEach((item) => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const selectedCategory = button.getAttribute('data-filter');
      filterCatalog(selectedCategory);
    });
  });

  // 3. Pre-fill Contact Form Subject when clicking "Inquire Now"
  const inquireButtons = document.querySelectorAll('.inquire-btn');
  const subjectInput = document.getElementById('subject');

  inquireButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modelName = btn.getAttribute('data-model');
      if (modelName && subjectInput) {
        subjectInput.value = `Inquiry: ${modelName}`;
      }
    });
  });

  // 4. Contact Form Validation with Clear User Feedback
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formFeedback = document.getElementById('formFeedback');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  function isValidEmail(emailValue) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailValue);
  }

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
    formFeedback.className = 'form-feedback';
    formFeedback.textContent = '';
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    let isFormValid = true;
    const nameVal = fullNameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const subjectVal = subjectInput.value.trim();
    const messageVal = messageInput.value.trim();

    if (nameVal.length < 3) {
      nameError.textContent = 'Please enter your full name (at least 3 characters).';
      isFormValid = false;
    }

    if (!isValidEmail(emailVal)) {
      emailError.textContent = 'Please enter a valid email address (e.g., name@example.com).';
      isFormValid = false;
    }

    if (subjectVal.length < 4) {
      subjectError.textContent = 'Please enter a clear subject (at least 4 characters).';
      isFormValid = false;
    }

    if (messageVal.length < 15) {
      messageError.textContent = 'Please provide a detailed message (at least 15 characters).';
      isFormValid = false;
    }

    if (!isFormValid) {
      formFeedback.classList.add('invalid');
      formFeedback.textContent = 'Validation failed: Please correct the highlighted fields above.';
      return;
    }

    formFeedback.classList.add('valid');
    formFeedback.textContent = `Form validated successfully for ${nameVal} (${emailVal}). Note: Client-side JavaScript validation passed—no backend mail server is connected.`;
  });
});