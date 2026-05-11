
document.addEventListener("keydown", (e) => {
    if (e.code === "KeyD") {
        console.log("D pressed");
        console.log(images.length);
    }
    if (e.code === "KeyT") {
        console.log("T pressed");
        modal.style.display = "block";
        modalImg.src = "images/ar-dl.png";
    }
});



var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
    modal.style.display = "none";
}

var images = document.getElementsByTagName('img'); //this is how we get all the images in the document.
var modalImg = document.getElementById("modal-img");
var i;
for (i = 0; i < images.length; i++) {
    images[i].onclick = function(){
    console.log("Image clicked"); //checks if image has been clicked
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modalImg.src = this.src;
    }
}