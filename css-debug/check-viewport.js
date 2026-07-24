function getViewportDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
function showViewportAlert() {
    const vp = getViewportDimensions();
    const msg = `Width: ${vp.width}\nHeight: ${vp.height}`;
    alert(msg);
}
function createButton() {
  const btn = document.createElement('button');
  btn.classList.add('css-debug', 'button', 'check-viewport');
  btn.textContent = '(X,Y)';
  document.body.appendChild(btn);
  btn.addEventListener('click',showViewportAlert);
}

createButton();
/* 
Phone: 411 x 777 / 411 x 792
*/