import { DEFAULT_PASSWORD } from "../store.js";

export function createLoginModal({
  users,
  currentUser,
  onLogin,
  onClose,
}) {
  const overlay = document.createElement("div");
  overlay.className = "login-overlay";

  const card = document.createElement("div");
  card.className = "login-card";

  const header = document.createElement("div");
  header.className = "login-header";
  header.innerHTML = "<h2>EOEX Access</h2>";

  const closeButton = document.createElement("button");
  closeButton.className = "icon-button";
  closeButton.type = "button";
  closeButton.textContent = "✕";
  closeButton.addEventListener("click", () => onClose());
  header.appendChild(closeButton);

  const form = document.createElement("form");
  form.className = "login-form";

  const emailField = document.createElement("input");
  emailField.type = "email";
  emailField.name = "email";
  emailField.placeholder = "Email";
  emailField.required = true;

  const passwordField = document.createElement("input");
  passwordField.type = "password";
  passwordField.name = "password";
  passwordField.placeholder = "Password";
  passwordField.required = true;

  const message = document.createElement("div");
  message.className = "login-message";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "button";
  submitButton.textContent = currentUser ? "Switch User" : "Login";

  form.appendChild(emailField);
  form.appendChild(passwordField);
  form.appendChild(message);
  form.appendChild(submitButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailField.value.trim();
    const password = passwordField.value;
    const loggedIn = onLogin(email, password);
    if (!loggedIn) {
      message.textContent = "Invalid credentials. Try one of the test accounts below.";
      message.classList.add("error");
    }
  });

  const quickPick = document.createElement("div");
  quickPick.className = "login-quick";

  const quickTitle = document.createElement("div");
  quickTitle.className = "badge";
  quickTitle.textContent = "Quick Login";
  quickPick.appendChild(quickTitle);

  const quickList = document.createElement("div");
  quickList.className = "quick-list";
  users.forEach((user) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary";
    button.textContent = `${user.name} (${user.app})`;
    button.addEventListener("click", () => {
      emailField.value = user.email;
      passwordField.value = user.password;
      form.requestSubmit();
    });
    quickList.appendChild(button);
  });
  quickPick.appendChild(quickList);

  const details = document.createElement("details");
  details.className = "credentials";
  const summary = document.createElement("summary");
  summary.textContent = "Show test credentials";
  details.appendChild(summary);

  const credList = document.createElement("div");
  credList.className = "credentials-list";
  users.forEach((user) => {
    const row = document.createElement("div");
    row.className = "credentials-row";
    row.innerHTML = `<strong>${user.name}</strong><span>${user.email}</span>`;
    credList.appendChild(row);
  });

  const passwordHint = document.createElement("div");
  passwordHint.className = "status";
  passwordHint.textContent = `Password for all users: ${DEFAULT_PASSWORD}`;

  details.appendChild(credList);
  details.appendChild(passwordHint);

  card.appendChild(header);
  card.appendChild(form);
  card.appendChild(quickPick);
  card.appendChild(details);
  overlay.appendChild(card);

  return overlay;
}
