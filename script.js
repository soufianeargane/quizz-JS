function changeName(){
    const title = document.getElementById("title");
    const name = document.getElementById("user-name");
    const button = document.getElementById("submit-name");

    title.innerHTML = "Hello " + name.value + "!";
    name.style.display = "none";
    button.style.display = "none";

}