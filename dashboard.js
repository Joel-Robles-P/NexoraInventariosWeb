const SUPABASE_URL =
'https://mbywcvtjngsrajmzxawu.supabase.co';

const SUPABASE_KEY =
'sb_publishable_Vj7owLMd5Gzv92Rs9TfWhA_b5PR8pTE';

const client =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// async function cargarKPIs() {

//     const { count, error } =
//     await client
//         .from('stock_actual')
//         .select('*', {
//             count: 'exact',
//             head: true
//         });

//     if (error) {

//         console.error(error);
//         return;
//     }

//     document.getElementById(
//         'totalProductos'
//     ).innerText = count;

// }

async function cargarKPIs() {

    const { data, error } =
    await client
        .from('stock_actual')
        .select('*');

    console.log(data);
    console.log(error);

}

cargarKPIs();