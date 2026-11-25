/*
function validarLogin() {

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    if (
            usuario === "admin" &&
            password === "SIUUUU"
        ) {

            sessionStorage.setItem(
                "logueado",
                "SI"
            );

            window.location.href =
                "dashboard.html";

        }
        else {

        document.getElementById("mensaje")
            .innerText =
            "Usuario o contraseña incorrecta";
    }

}
*/

function validarLogin() {
    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    const usuarios = [
        {
            usuario: "Joel",
            password: "SIUUUU",
            nombre: "Administrador"
        },
        {
            usuario: "Junior",
            password: "ELMASCAPO",
            nombre: "Jans - El mas Capo"
        },
        {
            usuario: "Jans",
            password: "ELMASCAPO",
            nombre: "Jans - El mas Capo"
        }
        {
            usuario: "Alan",
            password: "ALAN2026",
            nombre: "Jose"
        }
        {
            usuario: "Miguel",
            password: "MIGUEL2026",
            nombre: "Miguel Bolivar"
        }
        {
            usuario: "Vivian",
            password: "VIVIAN2026",
            nombre: "La Vivix"
        }
    ];

    const usuarioValido = usuarios.find(
        u =>
            u.usuario === usuario &&
            u.password === password
    );

    if (usuarioValido) {

        sessionStorage.setItem(
            "logueado",
            "SI"
        );

        sessionStorage.setItem(
            "usuario",
            usuarioValido.nombre
        );

        window.location.href =
            "dashboard.html";

    } else {

        document.getElementById("mensaje")
            .innerText =
            "Usuario o contraseña incorrecta";

    }
}
