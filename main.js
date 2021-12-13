"use strict"

//function that creates html elements with information from the array of objects, array of objects is now longer in a ul, but in a div
// nested within the parent div is: each coffee id is in a hidden child div, each coffee name is in an h3, each coffee roast is in a paragraph.

function renderCoffee(coffee) {
    var html = '<div id="list" class="coffee">';
    html += '<div hidden>' + coffee.id + '</div>';
    html += '<h3>' + coffee.name + '</h3>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

//this function puts the coffees in ascending ID order

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}


// this function updates the coffees on the html page when using the drop down menu

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === "Show All") {
            filteredCoffees.push(coffee);
        }
    });
    div.innerHTML = renderCoffees(filteredCoffees);
}

//array of objects (includes coffees by id, name and roast)

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var div = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

div.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);



//For search bar functionality

var searchCoffees = document.getElementById("search");

searchCoffees.addEventListener('keyup', function() {

    var userInput = searchCoffees.value.toLowerCase();
    var filteredCoffees = [];

    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().includes(userInput)) {
            filteredCoffees.push(coffee);
            console.log(filteredCoffees);
        }

    })
    div.innerHTML = renderCoffees(filteredCoffees);
})


