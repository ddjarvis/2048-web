function getUserAgent() {
    return navigator.userAgent;
}

function showUserAgentAlert() {
    const ua = getUserAgent();
    const msg = `UserAgent: ${ua}`;
    alert(msg);
}

function createShowUserAgentAlertButton() {
  const btn = document.createElement('button');
  btn.classList.add('css-debug', 'button', 'show-useragent');
  btn.textContent = 'Show UA';
  document.body.appendChild(btn);
  btn.addEventListener('click',showUserAgentAlert);
}

createShowUserAgentAlertButton();