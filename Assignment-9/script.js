// Open the appointment booking form
function openAppointmentForm(service) {
    document.getElementById("appointment-form-modal").style.display = "flex";
    document.getElementById("service").value = service;
}

// Close the appointment booking form
function closeAppointmentForm() {
    document.getElementById("appointment-form-modal").style.display = "none";
}

// Form validation
function validateForm() {
    let valid = true;

    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dateTime = document.getElementById("date-time").value;
    const terms = document.getElementById("terms").checked;

    // Clear previous errors
    document.getElementById("name-error").textContent = '';
    document.getElementById("email-error").textContent = '';
    document.getElementById("phone-error").textContent = '';
    document.getElementById("terms-error").textContent = '';

    // Validate Name
    if (!name) {
        document.getElementById("name-error").textContent = "Name is required";
        valid = false;
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        document.getElementById("email-error").textContent = "Invalid email format";
        valid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById("phone-error").textContent = "Phone number must be 10 digits";
        valid = false;
    }

    // Validate Date & Time
    if (new Date(dateTime) <= new Date()) {
        document.getElementById("date-time-error").textContent = "Preferred date and time must be in the future";
        valid = false;
    }

    // Validate Terms Checkbox
    if (!terms) {
        document.getElementById("terms-error").textContent = "You must agree to the terms and conditions";
        valid = false;
    }

    return valid;
}

// Handle form submission
document.getElementById("appointment-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        const name = document.getElementById("full-name").value;
        const service = document.getElementById("service").value;
        const dateTime = document.getElementById("date-time").value;
        const appointment = {
            name,
            service,
            dateTime,
            status: "Pending"
        };

        // Save appointment in LocalStorage
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        // Display confirmation
        alert(`Thank you, ${name}! Your appointment for ${service} on ${dateTime} is confirmed.`);

        // Close the form and reset fields
        closeAppointmentForm();
        document.getElementById("appointment-form").reset();

        // Update the appointments table
        displayAppointments();
    }
});

// Display booked appointments
function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const appointmentsTable = document.getElementById("appointments-table").getElementsByTagName("tbody")[0];
    appointmentsTable.innerHTML = ''; // Clear existing rows

    appointments.forEach(appointment => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.dateTime}</td>
            <td>${appointment.status}</td>
        `;
        appointmentsTable.appendChild(row);
    });
}

// Load appointments on page load
window.onload = function () {
    displayAppointments();
};
