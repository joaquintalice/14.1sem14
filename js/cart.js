document.addEventListener("DOMContentLoaded", main)

function main() {
    showData()
}

const cartDataContainer = document.getElementById('cart-data');
const totalContainer = document.getElementById('total')
const payBtn = document.getElementById('pay-btn');

function showData() {
    let template = ``;
    let cantidadTotal = 0;
    let precioTotal = 0;

    const data = JSON.parse(localStorage.getItem('data'));

    if (data) {

        const result = data.reduce((acc, product) => {
            acc[product.id] = acc[product.id] || [];
            acc[product.id].push(product);
            return acc;
        }, {});

        const uniqueProducts = data.filter((product, index, array) => {
            return array.findIndex(item => item.id === product.id) === index;
        });

        for (let prod of uniqueProducts) {
            const { id, precio, producto } = prod;
            const cantidad = result[id].length;
            const totalProducto = cantidad * precio;
            cantidadTotal += cantidad;
            precioTotal += totalProducto;

            template += `
                <div class='col-12 col-sm-6 col-md-4'>
                    <div class="card">
                        <div class="card-header">
                        ${producto} 
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID DEL PRODUCTO: ${id}</li>
                        <li class="list-group-item">PRECIO UNITARIO: ${precio}</li>
                        <li class="list-group-item">CANTIDAD: ${cantidad}</li>
                        <li class="list-group-item">PRECIO TOTAL: ${totalProducto}</li>
                        </ul>
                    </div>
                </div>
            `;
        }

    } else {
        template += `
            <div class="alert alert-danger text-center" role="alert">
                Aún no hay productos en el carrito
            </div>
        `
    }

    cartDataContainer.innerHTML = template;
    totalContainer.innerHTML = precioTotal

}

payBtn.addEventListener('click', () => {
    alert('Pago realizado con éxito. Oficialmente te acabas de fundir.')
    localStorage.removeItem('data');
    location.href = 'destino.html'
})