//constante y texto JSON
const IVA = 0.13;
const perfumes = [
    {nombre:"Mandarin sky", tipo:"floral", precio:25000},
    {nombre:"Hawas elixir", tipo:"dulce", precio:30000},
    {nombre:"vulcan feu", tipo:"fresco", precio:22000}
];

const $ = id => document.getElementById(id);

const tienda = {
    moneda:"₡",
    mostrar(p){ return `${this.moneda}${p}`; }
};
//|Funcion DOM para mostrar los productos del catalogo
function mostrarProductos(lista){
    const catalogo = $("catalogo");
    if(!catalogo) return;
    catalogo.innerHTML = "";
    lista.forEach(p => {
        catalogo.innerHTML += `<div class="perfume"><h3>${p.nombre}</h3><p>Tipo: ${p.tipo}</p><p>Precio: ${tienda.mostrar(p.precio)}</p></div>`;
    });
}

//funcion para buscar el tipo 
function buscar(tipo){
    return tipo === "todos" ? perfumes : perfumes.filter(p => p.tipo === tipo);
}


const tipo = $("tipo");
if(tipo){
    mostrarProductos(perfumes);
    tipo.addEventListener("change", () => mostrarProductos(buscar(tipo.value)));
}


const btnNombre = $("btnNombre");
if(btnNombre){
    btnNombre.addEventListener("click", () => {
        const nombre = prompt("¿Cuál es tu nombre?");
        const texto = String(nombre || "").trim();
        $("mensaje").textContent = texto ? `Hola ${texto}, bienvenido a Perfumes Elegance.` : "No ingresaste un nombre.";
    });
}


const btnUbicacion = $("btnUbicacion");
if(btnUbicacion){
    btnUbicacion.addEventListener("click", () => {
        if(!navigator.geolocation){
            $("ubicacion").textContent = "geolocalizacion no disponible.";
            return;
        }
        navigator.geolocation.getCurrentPosition(pos => {
            const datos = {latitud:pos.coords.latitude, longitud:pos.coords.longitude};
            localStorage.setItem("ubicacion", JSON.stringify(datos));
            $("ubicacion").textContent = `Ubicación guardada: ${datos.latitud.toFixed(2)}, ${datos.longitud.toFixed(2)}`;
        
        });
    });
}

// Switch para recomendar el tipo
function recomendar(tipo){
    switch(tipo){
        case "floral": return "Te recomendamos Mandarin sky.";
        case "dulce": return "Te recomendamos Hawas elixir";
        case "fresco": return "Te recomendamos Vulcan feu.";
        default: return "Escriba una opcion correcta";
    }
}

// Evento del switch
const btnRecomendar = $("btnRecomendar");
if(btnRecomendar){
    btnRecomendar.addEventListener("click", () => {
        const opcion = prompt("Escribe: floral, dulce o fresco y te aparecera la opcion que mejor se acomode a ti");
        $("resultado").textContent = recomendar(String(opcion || "").toLowerCase());
    });
}

