function validarLogin() {

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    if (
        usuario === "admin" &&
        password === "SIUUUU"
    ) {

        window.location.href = "dashboard.html";

    }
    else {

        document.getElementById("mensaje")
            .innerText =
            "Usuario o contraseña incorrecta";
    }

}