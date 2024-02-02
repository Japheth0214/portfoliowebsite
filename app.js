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
    document.querySelector("#submitForm").addEventListener("click", async function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("emailInput").value;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const nameInput = document.getElementById("nameInput").value;
        const subjectInput = document.getElementById("subjectInput").value;
        const messageInput = document.getElementById("messageInput").value;

        if (!nameInput || !subjectInput || !messageInput || !emailInput) {
            alert("Please fill out all the information below before clicking submit form!");
        } else if (messageInput.length < 50 || !emailRegex.test(emailInput)) {
            let errorMessage = "";
            if (messageInput.length < 50) {
                errorMessage += "Message should have at least 50 characters! ";
            }
            if (!emailRegex.test(emailInput)) {
                errorMessage += "Email address is not valid!";
            }
            alert(errorMessage);
        } else {
            const formData = {
                name: nameInput,
                email: emailInput,
                subject: subjectInput,
                message: messageInput,
            };

            try {
                const response = await fetch('https://japheth-website-portfolio.onrender.com/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.success) {
                    alert("Thank you for your interest and reviewing my application \nForm submitted successfully!");
                    document.getElementById("contactForm").reset();
                } else {
                    alert("Error sending the email. Please try again later.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    });

})();
