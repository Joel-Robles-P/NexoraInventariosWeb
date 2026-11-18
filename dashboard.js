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

}
cargarKPIs();