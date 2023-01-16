


//Toggles between dark mode and light mode
function colorMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
};

//Scrolls page down onload

function Scrolldown() {
    window.scroll(0, 200);
}

window.onload = Scrolldown();

//For search bar


function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('form-control mr-sm-2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchFaq");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//Show FAQ when click on search bar

$('form-control mr-sm-2').click(function() {
    document.getElementById('#searchFaq').style.display = 'inline';
});

//Transition logo size