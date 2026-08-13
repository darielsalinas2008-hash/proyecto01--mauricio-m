// Web Worker para calcular el descuento
const btnPrecio = $("btnPrecio");
if(btnPrecio){
    btnPrecio.addEventListener("click", () => {
        const precio = Number(perfumes[0].precio);
        const worker = new Worker("js/worker.js");
        worker.postMessage(precio);
        worker.onmessage = e => {
            $("resultado").textContent = `Precio con 10% de descuento: ₡${e.data}`;
            worker.terminate();
        };
    });
}