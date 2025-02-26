document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el formulario de membresía
    const membershipForm = document.querySelector(".membership-form");
    if (membershipForm) {
        membershipForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado

            const formData = {
                name: membershipForm["cf-name"].value.trim(),
                email: membershipForm["cf-email"].value.trim(),
                phone: membershipForm["cf-phone"].value.trim(),
                message: membershipForm["cf-message"].value.trim(),
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
                    membershipForm.reset();
                } else {
                    alert("Error al enviar el correo.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al enviar el formulario.");
            }
        });
    }

    // Seleccionar el formulario de contacto (preguntar cualquier cosa)
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado

            const formData = {
                name: contactForm["cf-name"].value.trim(),
                email: contactForm["cf-email"].value.trim(),
                message: contactForm["cf-message"].value.trim(),
            };

            if (!formData.name || !formData.email || !formData.message) {
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
                    contactForm.reset();
                } else {
                    alert("Error al enviar el correo.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al enviar el formulario.");
            }
        });
    }
});
