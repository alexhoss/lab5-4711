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


function clearArtistList() {

    var artistList = document.querySelectorAll("#artistList li");

    for (var i = 0; li = artistList[i]; i++) {
        li.parentNode.removeChild(li);
    }


}


function loadStorage() {

    var artistList = document.getElementById("artistList");
    clearArtistList();

    var artistListStore = JSON.parse(localStorage.getItem('artists'));


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

}

function deleteStorage(nameToDel) {
    console.log(nameToDel);

    var artistList = JSON.parse(localStorage.getItem('artists'));
    console.log(artistList);
    for (var i in artistList) {
        if (artistList[i].name == nameToDel) {
            artistList.splice(i, 1);
            break;

        }
    }

    localStorage.setItem('artists', JSON.stringify(artistList));
    loadStorage();


}

function addArtist() {


    //hide form
    // document.getElementById("addArtistForm").style.display = "none";


    var nameValue = document.getElementById("artistName").value;
    var aboutValue = document.getElementById("artistAbout").value;
    var imgValue = document.getElementById("imgUrl").value;

    var artist = {
        name: nameValue,
        about: aboutValue,
        img: imgValue
    }

    if (localStorage.getItem('artists') == null) {
        var artists = [];
        artists.push(artist);
        localStorage.setItem('artists', JSON.stringify(artists));
    } else {
        var artistList = JSON.parse(localStorage.getItem('artists'));
        artistList.push(artist);
        // then reset the localStorage
        localStorage.setItem('artists', JSON.stringify(artistList));
    }

    loadStorage();



}