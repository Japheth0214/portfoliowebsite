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

        const emailInput = document.getElementById("emailInput").value;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const nameInput = document.getElementById("nameInput").value;
        const subjectInput = document.getElementById("subjectInput").value;
        const messageInput = document.getElementById("messageInput").value;

        const successNotification = document.getElementById("successNotification");
        const errorNotification = document.getElementById("errorNotification");

        function hideErrorMessages() {
            // Hide all error messages
            successNotification.style.display = "none";
            errorNotification.style.display = "none";
        }

        if (!nameInput || !subjectInput || !messageInput || !emailInput) {
            // Show custom error notification for errors
            errorNotification.innerHTML = "⚠️ Unable to submit the form. Please complete all required fields.";
            errorNotification.style.display = "block";
            // Keep the text as "Submit Form" until the user resolves the error
            btnText.textContent = "Submit Form";

            // Hide error messages after 5 seconds
            setTimeout(hideErrorMessages, 3000);
        } else if (messageInput.length < 10 || !emailRegex.test(emailInput)) {
            let errorMessage = "⚠️ ";
            if (messageInput.length < 10) {
                errorMessage += "Message should have at least 10 characters! ";
            }
            if (!emailRegex.test(emailInput)) {
                errorMessage += "Email address is not valid!";
            }
            // Show custom error notification for errors
            errorNotification.innerHTML = errorMessage;
            errorNotification.style.display = "block";
            // Keep the text as "Submit Form" until the user resolves the error
            btnText.textContent = "Submit Form";

            // Hide error messages after 5 seconds
            setTimeout(hideErrorMessages, 3000);
        } else {
            // Change the text to "Sending" during submission
            btnText.textContent = "Sending...";

            emailjs.send(window.emailConfig.serviceID, window.emailConfig.templateID, {
                    name: nameInput,
                    email: emailInput,
                    subject: subjectInput,
                    message: messageInput,
                })
                .then(function (response) {
                    console.log("Email sent successfully:", response);
                    document.querySelector(".contact-form").reset();
                    // Change the "Sending" text message on success
                    btnText.textContent = "Form submitted!";

                    // Show custom success notification
                    successNotification.style.display = "block";

                    // Hide the success notification after 3 seconds
                    setTimeout(function () {
                        successNotification.style.display = "none";
                        // Revert the text back to the original
                        btnText.textContent = "Submit Form";
                    }, 5000);
                })
                .catch(function (error) {
                    console.log("Email failed to send:", error);
                    // Show custom error notification for errors
                    errorNotification.innerHTML = "❌ Error sending the email. Please try again later.";
                    errorNotification.style.display = "block";
                    // Revert the text back to the original only if there are errors
                    btnText.textContent = "Submit Form";

                    // Hide error messages after 5 seconds
                    setTimeout(hideErrorMessages, 3000);
                });
        }
    });

})();