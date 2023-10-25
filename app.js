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

    // Function to handle form submission
    document.querySelector(".submit-btn a").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Check if the email input is not empty and is valid
        const emailInput = document.getElementById("emailInput").value;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Check if any of the inputs are empty
        const nameInput = document.getElementById("nameInput").value;
        const subjectInput = document.getElementById("subjectInput").value;
        const messageInput = document.getElementById("messageInput").value;

        if (!nameInput || !subjectInput || !messageInput || !emailInput) {
            alert("Please fill out all the information below before clicking submit form!"); // Display error message for empty inputs
        } else if (messageInput.length < 50 || !emailRegex.test(emailInput)) {
            let errorMessage = "";
            if (messageInput.length < 50) {
                errorMessage += "Message should have atleast 50 characters! ";
            }
            if (!emailRegex.test(emailInput)) {
                errorMessage += "Email address is not valid!";
            }
            alert(errorMessage); // Display specific error message for email and combined conditions
        } else {
            alert("Thank you for your interest and reviewing my application \nForm submitted successfully!"); // Display success message
            document.querySelector(".contact-form").reset(); // Reset the form inputs
        }
    });
})();