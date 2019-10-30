let fs = require('fs');

var data = fs.readFileSync('artists.json')
var artists = JSON.parse(data);

function popUpForm() {
    var x = document.getElementById("addArtistForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchText');
    filter = input.value.toUpperCase();
    ul = document.getElementById("artistList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("p")[0];
        txtValue = p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function loadStorage() {

    $.getJSON("artists", function(data) {
        var artistList = document.getElementById("artistList");

        var artistListStore = data.artists;


        for (var i in artistListStore) {
            var nameValue = artistListStore[i].name;
            var aboutValue = artistListStore[i].about;
            var imgValue = artistListStore[i].img;

            var node = document.createElement("LI");
            var img = document.createElement('img');
            img.setAttribute("src", imgValue)
            img.setAttribute("class", "float-left artistImg")

            var name = document.createElement('p')
            name.setAttribute("class", "artistTitle")
            name.append(nameValue)

            var about = document.createElement('span');
            about.setAttribute("class", "");
            about.append(aboutValue);

            var delButton = document.createElement("button")
            delButton.setAttribute("class", "btn btn-danger float-right")
            delButton.append("Delete")

            delButton.addEventListener("click", function() {
                var li = this.parentNode;
                var nameToDel = li.childNodes[1].innerHTML;
                deleteStorage(nameToDel);

            });

            node.setAttribute("class", "list-group-item")

            node.appendChild(img);
            node.appendChild(name);
            node.appendChild(about);
            node.appendChild(delButton)
            artistList.appendChild(node);

            document.getElementById("addArtistForm").reset()


        }
    })
}




function deleteStorage(nameToDel) {
    var object = {
        name: nameToDel
    }

    $.post("/del", object);
    location.reload();

}