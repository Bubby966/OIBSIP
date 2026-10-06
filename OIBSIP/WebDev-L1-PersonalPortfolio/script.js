const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all fields before submitting.";
      formMessage.className = "form-message error";
      return;
    }

    if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.className = "form-message error";
      return;
    }

    formMessage.textContent =
      "Thank you! Your message has been prepared. Please use the email or LinkedIn link to contact me.";
    formMessage.className = "form-message success";
    form.reset();
  });
}
