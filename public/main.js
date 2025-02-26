document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".membership-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        const formData = {
            name: form["cf-name"].value,
            email: form["cf-email"].value,
            phone: form["cf-phone"].value,
            message: form["cf-message"].value,
        };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Correo enviado correctamente.");
                form.reset();
            } else {
                alert("Error al enviar el correo.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al enviar el formulario.");
        }
    });
});
