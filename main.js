"use strict"

function renderCoffee(coffee) {
    var html = '<div id="list" class="coffee">';
    html += '<div hidden>' + coffee.id + '</div>';
    html += '<h3>' + coffee.name + '</h3>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    div.innerHTML = renderCoffees(filteredCoffees);
}

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

submitButton.addEventListener('click', updateCoffees);


//For search bar functionality
let list = document.getElementById('list');

function setlist(group){
    clearlist();
    for(var coffee of group){
        let item = document.createElement('li')
        item.classList.add('list-group-item');
        var text = document.createTextNode(coffee.name);
        item.appendChild(text);
        list.appendChild(item)
    }
    if(group.length === 0){
        setNoResults();
    }
}
function clearlist(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

}
function setNoResults(){
    let item = document.createElement('li')
    item.classList.add('list-group-item');
    let text = document.createTextNode("No results found");
    item.appendChild(text);
    list.appendChild(item)

}
function getRelevancy(value, searchTerm){
    if (value === searchTerm){
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else{
        return 0;
    }

}
let searchInput = document.getElementById('search');
searchInput.addEventListener('input', (event) =>{
    let value = event.target.value;
    if(value && value.trim().length > 0){
        value = value.trim().toLowerCase();
        setlist(coffees.filter(coffee => {
            return coffee.name.includes(value);
        }).sort((coffeeA, coffeeB) => {
            return getRelevancy(coffeeB.name, value) - getRelevancy(coffeeA.name, value);
        }))
    }else {
        clearList();
    }
})
