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
cargarKPIs();