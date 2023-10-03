document.addEventListener("DOMContentLoaded", init);

function init() {
    getData()
    saveCounter()
}

async function getData() {
    const URL = 'productos.json'
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`Error je`);
    const data = await res.json();
    showData(data)
    return data
}

function showData(dataArray) {
    const prodContainer = document.getElementById('prod-container');
    let template = ``;

    for (let prod of dataArray) {
        const { precio, producto } = prod
        template += `
        <div class='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto}</h5>
                    <p class="card-text">Precio: ${precio}$</p>
                    <button class='btn btn-primary' onClick='addToCart(${JSON.stringify(prod)})'>Agregar al carrito <i class="bi bi-cart-plus"></i></button>
                </div>
            </div>
        </div>
        `
    }
    prodContainer.innerHTML = template
}

let count = 0
function addToCart(id) {
    const counter = document.getElementById('counter');
    const prodInLS = JSON.parse(localStorage.getItem('data'));

    if (!prodInLS) {
        localStorage.setItem('data', JSON.stringify([id]))
        count += 1
    } else {
        localStorage.setItem('data', JSON.stringify([...prodInLS, id]))
        count += 1
    }

    counter.textContent = count
}

function saveCounter() {
    const counter = document.getElementById('counter');

    const prodInLS = JSON.parse(localStorage.getItem('data'));

    if (prodInLS) {
        count += prodInLS.length
    } else {

        count = 0
    }

    counter.textContent = count
}
