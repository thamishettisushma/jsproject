let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

function addBirthday() {
    const name = document.getElementById('name').value.trim();
    const birthday = document.getElementById('birthday').value.trim();

    const nameError = document.getElementById('nameError');
    const birthdayError = document.getElementById('birthdayError');
    const successMessage = document.getElementById('successMessage');

    let isValid = true;

    if (!name) {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    if (!birthday) {
        birthdayError.style.display = 'block';
        isValid = false;
    } else {
        birthdayError.style.display = 'none';
    }

    if (isValid) {
        birthdays.push({ name, birthday: new Date(birthday) });
        localStorage.setItem('birthdays', JSON.stringify(birthdays));
        clearInputs();

        // Show success message
        showMessage("Birthday added successfully!", 2000);
    }
}

function showMessage(message, duration) {
    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = message;
    successMessage.style.display = 'block';

    // Hide message after the specified duration
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, duration);
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('birthday').value = '';
}

function goToBirthdayList() {
    window.location.href = "birthdays.html";
}