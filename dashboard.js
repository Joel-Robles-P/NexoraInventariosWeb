const SUPABASE_URL =
'https://mbywcvtjngsrajmzxawu.supabase.co';

const SUPABASE_KEY =
'TU_PUBLISHABLE_KEY';

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

    if (error) {

        console.error(error);
        return;
    }

    document.getElementById(
        'totalProductos'
    ).innerText = count;

}

cargarKPIs();