const listOfMovies = [
    'Władca much (1990)',
    'Władca Pierścieni (1978)',
    'Milczenie owiec (1991)',
    'Moja dziewczyna (1991)',
    'Dziewczyna z tatuażem (2011)',
    'Jestem Bogiem (2011)',
    'Jestem legendą (2007)',
    'Matrix (1999)',
    'Zielona mila (1999)',
    '8 Mila (2002)',
    'Uciekająca panna młoda (1999)',
    'Gnijąca panna młoda (2005)',
    'Dzień świra (2002)',
    'Dzień Niepodległości (1996)',
    'Dzień świstaka (1993)',
    'Lista Schindlera (1993)',
    'Czarna lista Hollywood (1991)',
    'Lista klientów (2012)',
    'Teraz albo nigdy (2018)',
    'Niech będzie teraz (2012)',
    'Zabójcze maszyny (2018)',
    'Zabójcza broń (1987)',
    'Znaki (2002)',
    'Znaki na drodze (1969)',
    'Wodne znaki (2013)',
    'Znaki dymne (1998)',
    'Jeden dzień (2011)',
    'Dzień próby (2001)',
    'Dzień z życia blondynki (2014)',
    'Panna Nikt (1996)',
    'Panna Meadows (2014)',
    'Panna Nikt (2010)',
    'Panna Julia (1951)'
];


var movies = [];
var uniqueYears = [];
var tagCloud = [];
var yearAscending = false;
var titleAscending = false;
var darkMode = false;

createListOfObjectMovies();
createTilesFromGivenList(movies);
createDictionaryFromMoviesTitle();
createTagCloudFromDictionaryToView();


function createListOfObjectMovies() {
    listOfMovies.forEach(function (entry) {
        var singleObject = {};
        let title = entry.substring(0, entry.length - 7);
        let year = entry.substring(entry.length - 5, entry.length - 1)
        singleObject['title'] = title;
        singleObject['year'] = year;
        movies.push(singleObject);
    })
    createUniqueYearsList();
    createYearListForSelectView();
}


function createUniqueYearsList() {
    let importantYears = [];
    movies.forEach(function (x) {
        importantYears.push(x.year);
    });

    uniqueYears = [...new Set(importantYears)];
    uniqueYears.sort();
}


function createYearListForSelectView() {
    let select = document.getElementById("select");
    for (let i = 0; i < uniqueYears.length; i++) {
        let option = document.createElement("option");
        txt = document.createTextNode(uniqueYears[i]);
        option.appendChild(txt);
        option.setAttribute("value", uniqueYears[i]);
        select.insertBefore(option, select.lastChild);
    }
}

function clearYearListFromSelectView() {
    let select = document.getElementById("select");
    while (select.lastElementChild) {
        select.removeChild(select.lastElementChild);
    }
}


function createTilesFromGivenList(list) {
    document.getElementById("moviesCounter").innerText = "Wyświetlono " + list.length + " z " + movies.length + " filmów.";

    let wrapper = document.getElementById("wrapper");
    let movie = document.getElementById("movie");
    for (let i = 0; i < list.length; i++) {
        let newChild = movie.cloneNode(deep = true);
        newChild.querySelector(".title").innerHTML = list[i].title;
        newChild.querySelector(".year").innerHTML = list[i].year;
        newChild.hidden = false;
        wrapper.appendChild(newChild);
    }
}


function removeAllTilesExceptFirstOne() {
    const wrapper = document.getElementById("wrapper");
    while (wrapper.lastElementChild.querySelector(".title").innerHTML.length != 0) {
        wrapper.removeChild(wrapper.lastElementChild);
    }
}

function selectYearOnChange(year) {
    let moviesFromGivenYear = [];
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].year == year) {
            moviesFromGivenYear.push(movies[i]);
        }
    }
    removeAllTilesExceptFirstOne();
    createTilesFromGivenList(moviesFromGivenYear);
}




function createDictionaryFromMoviesTitle() {
    tagCloud = [];
    let dictionary = [];
    movies.forEach(function (movie) {
        let tmp = movie.title.split(" ");
        for (let i = 0; i < tmp.length; i++) {
            dictionary.push(tmp[i].toLocaleUpperCase());
        }
    })
    dictionary.sort();

    var currentTag = null;
    var counter = 0;
    for (var i = 0; i < dictionary.length; i++) { 
        if (dictionary[i] != currentTag) { 
            if (counter > 0) { 
                tagCloud.push({ tag: currentTag, amount: counter }); 
            }
            currentTag = dictionary[i]; 
            counter = 1; 
        } else {
            counter++; 
        }
    }


    tagCloud.sort(function (a, b) {
        return a.tag.localeCompare(b.tag)
    });

    tagCloud.push({ tag: "WSZYSTKIE", amount: movies.length });
}



function createTagCloudFromDictionaryToView() {
    let tagContainer = document.getElementById("tags"); 
    removeAllTagsFromView();
    for (let i = 0; i < tagCloud.length; i++) { 
        let tag = document.createElement("span"); 
        tag.innerText = tagCloud[i].tag + " "; 
        tag.setAttribute('onclick', 'tagClick("' + tagCloud[i].tag + '")'); 
        tag.classList.add("tag"); 
        tagContainer.appendChild(tag); 
    }

    let tags = document.getElementsByClassName("tag"); 

    for (let i = 0; i < tags.length; i++) {  
        let counter = tagCloud[i].amount; 

        switch (counter) { 
            case 1: tags[i].style.fontSize = "8px"; break; 
            case 2: tags[i].style.fontSize = "12px"; break; 
            case 3: tags[i].style.fontSize = "16px"; break; 
            case 4: tags[i].style.fontSize = "20px"; break; 
            default: tags[i].style.fontSize = "24px"; 
        }
    }
}

function removeAllTagsFromView() {
    const tagContainer = document.getElementById("tags");

    while (tagContainer.lastElementChild) {
        tagContainer.removeChild(tagContainer.lastElementChild);
    }
}


function tagClick(val) { 
    let list = []; 

    for (let i = 0; i < movies.length; i++) { 
        if (movies[i].title.toUpperCase().includes(val)) {
            list.push(movies[i]); 
        }
    }

    if (val == "WSZYSTKIE") { 
        removeAllTilesExceptFirstOne();
        createTilesFromGivenList(movies); 
        return; 
    }
    removeAllTilesExceptFirstOne();
    createTilesFromGivenList(list); 
}

function changeModeToDark() {
    var buttonText = document.getElementById("colorModeButton");
    if (darkMode) {
        colorModeButton.style.color = "#858585"
        colorModeButton.style.background = "#303030"
        document.body.classList.toggle("dark");
        buttonText.innerHTML = "Włącz tryb nocny";
        darkMode = false;
        
    } else {
        colorModeButton.style.color = "#303030";
        colorModeButton.style.background = "#d4d4d4";
        document.body.classList.toggle("dark");
        buttonText.innerHTML = "Włącz tryb dzienny";
        darkMode = true;
    }

}


function addMovie() {
    var addMovieLabel = document.getElementById("addMovieLabel");
    addMovieLabel.style.display = "block";
    var newMovie = {};
    let newTitle = document.getElementById("inputTitle").value; 
    let newYear = document.getElementById("inputYear").value; 
    if (newTitle.length == 0 || newYear.length == 0) {
        addMovieLabel.innerHTML = "Brakuje tytułu lub daty premiery.";
        addMovieLabel.style.color = "red";
        fadeOut(addMovieLabel,5000)
        return;
    }
    newMovie['title'] = newTitle;
    newMovie['year'] = newYear;
    movies.push(newMovie);
    removeAllTilesExceptFirstOne();
    createTilesFromGivenList(movies); 
    createDictionaryFromMoviesTitle();
    createTagCloudFromDictionaryToView();
    createUniqueYearsList();
    clearYearListFromSelectView();
    createYearListForSelectView();
    addMovieLabel.innerHTML = "Dodano film.";
    addMovieLabel.style.color = "green";
    fadeOut(addMovieLabel, 5000);
}

function fadeOut(element, time) {
    element.style.opacity = 1;
  
    var last = +new Date();
    var tick = function() {
      element.style.opacity = element.style.opacity - (new Date() - last) / time;
      last = +new Date();
  
      if (+element.style.opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
  
    tick();
  }


function sortMoviesByTitle() {
    if (titleAscending) {
        movies.sort((a, b) => a.title.localeCompare(b.title));
        titleAscending = false;
    } else {
        movies.sort((a, b) => b.title.localeCompare(a.title));
        titleAscending = true;
    }
    removeAllTilesExceptFirstOne();
    createTilesFromGivenList(movies);
}

function sortMoviesByYear() {
    if (yearAscending) {
        movies.sort((a, b) => (parseInt(a.year) < parseInt(b.year)) ? 1 : -1)
        yearAscending = false;
    } else {
        movies.sort((a, b) => (parseInt(a.year) > parseInt(b.year)) ? 1 : -1)
        yearAscending = true;
    }
    removeAllTilesExceptFirstOne();
    createTilesFromGivenList(movies);
}
