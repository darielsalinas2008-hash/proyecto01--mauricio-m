// Web Worker para calcular el descuento
  worker.onmessage = e => {
            $("resultado").textContent = `Precio con 10% de descuento: ₡${e.data}`;
            worker.terminate();
        };