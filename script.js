function changeName(){
    const title = document.getElementById("title");
    const name = document.getElementById("name-input");
    const button = document.getElementById("submit-name");
    const welcome = document.querySelector(".welcome");
    const validate = document.querySelector(".valid-input");

    

    //validate the name and make sure the user has entered a name
    if(name.value == ""){
        validate.style.display = "block";
    }else{
        // Change the welcome message to include the name of the user
        welcome.innerHTML = "Hello " + name.value + "!";
        name.style.display = "none";
        title.style.display = "none";
        button.style.display = "none";
        validate.style.display = "none";
    }


}