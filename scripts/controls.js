/*
=====================================================================
                        KEYBOARD LISTENERS
=====================================================================
*/

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            action('up');
            break;
        case 'ArrowDown':
        case 'KeyS':
            action('down');
            break;
        case 'ArrowLeft':
        case 'KeyA':
            action('left');
            break;
        case 'ArrowRight':
        case 'KeyD':
            action('right');
            break;
        case 'KeyR':
            action('reset');
            break;
        default:
            console.log(`Key: ${event.code}`);
            break
    }
    event.preventDefault(); // stops page scrolling
});


/*
let startX, startY;
const threshold = 50; // minimum swipe distance
document.addEventListener('touchstart', (e) => {
startX = e.touches[0].clientX;
startY = e.touches[0].clientY;
e.preventDefault(); // stops page scrolling
},{ passive: false });

document.addEventListener('touchend', (e) => {
    e.preventDefault(); // stops page scrolling
const endX = e.changedTouches[0].clientX;
const endY = e.changedTouches[0].clientY;

const diffX = startX - endX;
const diffY = startY - endY;

if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
    if (diffX > threshold) action('left');
    else if (diffX < -threshold) action('right');
} else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
    if (diffY > threshold) action('up');
    else if (diffY < -threshold) action('down');
}
},{ passive: false });

*/

let xDown = null;
let yDown = null;
let swipeDirection = null;

const touchArea = document.getElementById('gameBoard');

touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, { passive: false });
touchArea.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        evt.preventDefault();
        if (xDiff > 0) {
            /* left swipe */ 
            console.log('Swipe Left');
            swipeDirection = 'left';
        } else {
            /* right swipe */
            console.log('Swipe Right');
            swipeDirection = 'right';
        }  
    } else {
        evt.preventDefault();
        if (yDiff > 0) {
            /* up swipe */ 
            console.log('Swipe Up');
            swipeDirection = 'up';
        } else { 
            /* down swipe */
            console.log('Swipe Down');
            swipeDirection = 'down';
        }  
    }

    xDown = null;
    yDown = null;  
}

function handleTouchEnd(evt) {
    // Reset values or handle end of touch event
    action(swipeDirection);
    console.log(`Swipe Direction: ${swipeDirection}`);
}

