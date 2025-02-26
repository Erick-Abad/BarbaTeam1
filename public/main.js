document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".membership-form");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            name: form["cf-name"].value.trim(),
            email: form["cf-email"].value.trim(),
            phone: form["cf-phone"].value.trim(),
            message: form["cf-message"].value.trim(),
        };

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert("Todos los campos son obligatorios.");
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
                alert("Error al enviar el correo.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al enviar el formulario.");
        }
    });
});
