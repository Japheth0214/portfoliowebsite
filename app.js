(function () {
    // Function to handle switching between contact information and form
    [...document.querySelectorAll(".control")].forEach((button) => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // Function to handle toggling the light mode
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Initialize EmailJS with the user ID
    emailjs.init(window.emailConfig.userID);

// Function to handle form submission
    document.querySelector("#submitForm").addEventListener("click", function (event) {
        event.preventDefault();

        const submitButton = this; // Reference to the submit button
        const btnText = submitButton.querySelector('.btn-text'); // Reference to the span with class 'btn-text'

        // Change the text to "Sending" during submission
        btnText.textContent = "Sending...";

        const emailInput = document.getElementById("emailInput").value;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const nameInput = document.getElementById("nameInput").value;
        const subjectInput = document.getElementById("subjectInput").value;
        const messageInput = document.getElementById("messageInput").value;

        if (!nameInput || !subjectInput || !messageInput || !emailInput) {
            alert("⚠️ Unable to submit the form. Please complete all required fields.");
            // Keep the text as "Sending" until the user resolves the error
        } else if (messageInput.length < 50 || !emailRegex.test(emailInput)) {
            let errorMessage = "⚠️ ";
            if (messageInput.length < 50) {
                errorMessage += "Message should have at least 50 characters! ";
            }
            if (!emailRegex.test(emailInput)) {
                errorMessage += "Email address is not valid!";
            }
            alert(errorMessage);
            // Keep the text as "Sending" until the user resolves the error
        } else {
            emailjs.send(window.emailConfig.serviceID, window.emailConfig.templateID, {
                    name: nameInput,
                    email: emailInput,
                    subject: subjectInput,
                    message: messageInput,
                })
                .then(function (response) {
                    console.log("Email sent successfully:", response);
                    alert("✅ Form submitted successfully! Thanks for your interest. I'll get back to you as soon as possible.");
                    document.querySelector(".contact-form").reset();
                })
                .catch(function (error) {
                    console.log("Email failed to send:", error);
                    alert("❌ Error sending the email. Please try again later.");
                })
                .finally(function () {
                    // Revert the text back to the original only if there are no errors
                    btnText.textContent = "Submit Form";
                });
        }
    });

})();
