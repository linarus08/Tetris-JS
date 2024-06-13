
function hidden_tags() {
    Array.from(document.body.children).map(item => item.getAttribute("id") == "box" ? item.setAttribute("style", "opacity: 1") : item.setAttribute("style", "opacity: 0.1"))
}

let url = window.location.pathname;
if (url == '/register/' || url == '/login/') {
    hidden_tags();
}
