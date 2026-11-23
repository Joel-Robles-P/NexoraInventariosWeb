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
            usuario: "admin",
            password: "SIUUUU",
            nombre: "Administrador"
        },
        {
            usuario: "joel",
            password: "JOEL2026",
            nombre: "Joel"
        },
        {
            usuario: "edison",
            password: "EDISON2026",
            nombre: "Edison"
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
