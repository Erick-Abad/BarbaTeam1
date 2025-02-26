document.addEventListener("DOMContentLoaded", function () {
    async function handleFormSubmit(form, hasPhone = true) {
        if (!form) return;

        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado de recargar la página

            const formData = {
                name: form["cf-name"].value.trim(),
                email: form["cf-email"].value.trim(),
                message: form["cf-message"].value.trim(),
            };

            if (hasPhone) {
                formData.phone = form["cf-phone"].value.trim();
            }

            // Validación de campos vacíos
            if (!formData.name || !formData.email || (hasPhone && !formData.phone) || !formData.message) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            // Validación del formato de email
            if (!validateEmail(formData.email)) {
                alert("Por favor, ingrese un correo válido.");
                return;
            }

            // Validación del formato del teléfono (10 dígitos, sin caracteres especiales)
            if (hasPhone && !/^\d{10}$/.test(formData.phone)) {
                alert("El número de celular debe contener exactamente 10 dígitos.");
                return;
            }

            try {
                const response = await fetch("/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    alert("Correo enviado correctamente.");
                    form.reset();
                } else {
                    alert("Error al enviar el correo. Inténtelo de nuevo más tarde.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al enviar el formulario.");
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Aplicar el manejador a los formularios
    handleFormSubmit(document.querySelector(".membership-form"), true); // Formulario de membresía con teléfono
    handleFormSubmit(document.querySelector(".contact-form"), false); // Formulario de contacto sin teléfono
});
