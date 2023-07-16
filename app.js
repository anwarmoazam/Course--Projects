document.addEventListener('DOMContentLoaded', getData);

let data = [];

document.getElementById('selectors').addEventListener('change', function (event) {
    const [key, order] = event.target.value.split('.')
    if (key && order) {
        sortData(key, order);
    }
})

document.getElementById('filter').addEventListener('click', function (event) {
    document.querySelector('#filter li.active').classList.remove('active');
    event.target.classList.add('active');
    const filterData = filterItems(event.target.dataset.type);
    renderData(filterData);
})


function renderData(data) {
    const fragmentDOM = document.createDocumentFragment();
    
    data.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        const item = `<div class="card-img"><img src="${element.img_url}" alt="${element.name}"></div>
        <div class="card-details">
        <div class="details">
        <div class="mark">
        <span class="agmark agmark-${element.isVeg === true ? `veg` : `nonveg`}"></span>
        <h4 class="product-name">${element.name}</h4>
        </div>
        <p>${element.description}</p>
        </div>
        <div class="raiting-details">
        <div class="star-raiting" style="background-color: rgb(${scaleValue(element.rating, [1, 5], [0, 255])}, 255,0)">
        <span class="star"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg></span><span class="rating">${element.rating}</span>
        </div>
        <div class="price">RS. ${element.price}</div>
        </div>
        <div class="add-remove">
        <div class="counter">
        <button>-</button>
        <span class="">0</span>
        <button>+</button>
        </div>
        </div>
        </div>`
        card.innerHTML = item;
        fragmentDOM.appendChild(card);
    })
    
    
    const cards = document.getElementById('cards');
    cards.innerHTML = ""
    cards.appendChild(fragmentDOM);

    const addRemoveButtons = document.querySelectorAll('.counter');
    addRemoveButtons.forEach(button => console.log(button.children))
}


function getData() {
    const _data = fetch('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68');

    _data.then(response => response.json())
    .then(d => {
        data = d;
        renderData(d)
    });
}


function scaleValue(input, inputRange, outputRange) {
    return ((input - inputRange[0]) / (inputRange[1] - inputRange[0])) * (outputRange[1] - outputRange[0]) + outputRange[0];
}

function sortData(key, order) {
    data.sort((item1, item2) => {
        if (order === 'asc') {
            if (item1[key] < item2[key]) {
                return -1;
            }
            if (item1[key] > item2[key]) {
                return 1;
            }
            return 0;
        } else {
            if (item2[key] < item1[key]) {
                return -1;
            }
            if (item2[key] > item1[key]) {
                return 1;
            }
            return 0;
        }
    })
    renderData(data);
}

function filterItems(type) {
    switch (type) {
        case 'veg':
            return data.filter(item => item.isVeg === false)
        case 'nonveg':
            return data.filter(item => item.isVeg === true)
        default:
            return data;
    }
}