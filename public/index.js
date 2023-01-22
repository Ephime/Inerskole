


//Toggles between dark mode and light mode
function colorMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
};

//Scrolls page down onload

function Scrolldown() {
    window.scroll(0, 100);
}

window.onload = Scrolldown();