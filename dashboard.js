const SUPABASE_URL =
'https://mbywcvtjngsrajmzxawu.supabase.co';

const SUPABASE_KEY =
'sb_publishable_Vj7owLMd5Gzv92Rs9TfWhA_b5PR8pTE';

const client =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function cargarKPIs() {

    const { count, error } =
    await client
        .from('stock_actual')
        .select('*', {
            count: 'exact',
            head: true
        });

        console.log("COUNT:", count);
        console.log("ERROR:", error);

    document.getElementById(
        'totalProductos'
    ).innerText = count;

    const { count: movimientos } =
    await client
        .from('movimientos_stock')
        .select('*', {
            count: 'exact',
            head: true
        });

    document.getElementById(
        'totalMovimientos'
    ).innerText = movimientos;

    const { count: bajoStock } =
    await client
        .from('stock_actual')
        .select('*', {
            count: 'exact',
            head: true
        })
        .lte('stock_actual', 20)
        .neq('familia', '06-ELECTRO')
        .neq('familia', '09-INFORMATICA')
        .neq('familia', '11-MOBILIARIO');

    document.getElementById(
        'bajoStock'
    ).innerText = bajoStock;

    const { data: vencimientos, error: errorVenc } =
    await client
        .from('stock_actual')
        .select('verificacion_vencimiento');

    const proximosVencer =
    vencimientos.filter(item => {

        const texto =
        (item.verificacion_vencimiento || '')
        .toUpperCase();

        return texto.startsWith('ALERTA') ||
            texto.startsWith('ADVERTENCIA');

    }).length;

    document.getElementById(
        'proximosVencer'
    ).innerText = proximosVencer;

    console.log(
        "PROXIMOS A VENCER:",
        proximosVencer
    );
}

async function cargarInventario(textoBusqueda = '') {

    let consulta =
    client
        .from('stock_actual')
        .select(`
            codigo_patrimonial,
            descripcion,
            familia,
            stock_actual,
            ubicacion,
            ultima_area_asignada,
            fecha_vencimiento,
            url
        `);

    if(textoBusqueda){

        consulta =
        consulta = consulta.or(`codigo_patrimonial.ilike.%${textoBusqueda}%,descripcion.ilike.%${textoBusqueda}%`
        );

    }

    const { data, error } =
    await consulta.limit(10);

    if (error) {

        console.error(error);

        return;

    }

    console.log("DATA:", data);
    console.log("ERROR:", error);
    console.log("PRIMER PRODUCTO:", data[0]);

    if (error) {

        console.error(error);
        return;

    }

    let html = '';


data.forEach(producto => {

    html += `
    <tr style="cursor:pointer"
        onclick="mostrarDetalle(
            '${producto.codigo_patrimonial ?? ''}',
            '${producto.descripcion ?? ''}',
            '${producto.familia ?? ''}',
            '${producto.stock_actual ?? 0}',
            '${producto.ubicacion ?? ''}',
            '${producto.ultima_area_asignada ?? ''}',
            '${producto.fecha_vencimiento ?? ''}',
            '${producto.url ?? ''}'
        )">

        <td>${producto.codigo_patrimonial ?? ''}</td>

        <td>${producto.descripcion ?? ''}</td>

        <td>${producto.stock_actual ?? ''}</td>

        <td>Disponible</td>

        <td>${producto.ubicacion ?? ''}</td>

    </tr>
    `;

});

    document.getElementById(
        'tablaInventario'
    ).innerHTML = html;
}

function cerrarSesion() {

    sessionStorage.removeItem(
        "logueado"
    );

    window.location.href =
        "login.html";

}

cargarKPIs();
cargarInventario();

function mostrarDetalle(
    codigo,
    descripcion,
    familia,
    stock,
    ubicacion,
    area,
    vencimiento,
    imagen
)
{

    document.getElementById(
        "detalleCodigo"
    ).innerText = codigo;

    document.getElementById(
        "detalleDescripcion"
    ).innerText = descripcion;

    document.getElementById(
        "detalleFamilia"
    ).innerText = familia;

    document.getElementById(
        "detalleStock"
    ).innerText = stock;

    document.getElementById(
        "detalleUbicacion"
    ).innerText = ubicacion;

    document.getElementById(
        "detalleArea"
    ).innerText = area || "-";

    document.getElementById(
        "detalleVencimiento"
    ).innerText =
        vencimiento
        ? vencimiento
        : "Sin vencimiento";

    document.getElementById(
        "detalleImagen"
    ).src =
        imagen &&
        imagen.trim() !== ""
        ? imagen
        : "https://via.placehoDlder.com/300x200?text=Sin+Imagen";

}

let temporizadorBusqueda;

    document
    .getElementById("txtBuscar")
    .addEventListener("input", function(){

        clearTimeout(
            temporizadorBusqueda
        );

        const texto =
            this.value.trim();

        temporizadorBusqueda =
            setTimeout(() => {

                cargarInventario(
                    texto
                );

            }, 100);

});    