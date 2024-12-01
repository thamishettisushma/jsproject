const birthdayList = document.getElementById('birthdayList');
const upcomingNotification = document.getElementById('upcomingNotification');
const upcomingMessage = document.getElementById('upcomingMessage');
let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
let editIndex = null; // Track which birthday is being edited

function displayBirthdays() {
    birthdayList.innerHTML = '';
    let upcomingBirthday = false;
    let nearestBirthday = null;

    birthdays.sort((a, b) => getDaysUntilBirthday(a.birthday) - getDaysUntilBirthday(b.birthday));

    birthdays.forEach((bday, index) => {
        const daysUntil = getDaysUntilBirthday(bday.birthday);

        // Create a Bootstrap card
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 birthday-card';

        card.innerHTML = `
                    <div class="card ${daysUntil <= 7 ? 'highlight' : ''}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${bday.name}</h5>
                            <p class="card-text">${formatDate(bday.birthday)}</p>
                            <p class="card-text">${daysUntil} day${daysUntil > 1 ? 's' : ''} left</p>
                            <button class="btn  btn-sm me-2" onclick="startEdit(${index})" id="color">Edit</button>
                            <button class="btn  btn-sm" onclick="removeBirthday(${index})" id="color">Remove</button>
                        </div>
                    </div>
                `;

        // Add edit form if this card is being edited
        if (editIndex === index) {
            const editForm = document.createElement('div');
            editForm.className = 'edit-form';
            editForm.innerHTML = `
                        <form onsubmit="updateBirthday(event, ${index})">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="editName" placeholder="Name" value="${bday.name}" required>
                            </div>
                            <div class="mb-3">
                                <input type="date" class="form-control" id="editDate" value="${bday.birthday.substring(0, 10)}" required>
                            </div>
                            <button type="submit" class="btn  btn-sm" id="color">Save</button>
                            <button type="button" class="btn  btn-sm" id="color" onclick="cancelEdit()">Cancel</button>
                        </form>
                    `;
            card.appendChild(editForm);
        }

        birthdayList.appendChild(card);

        // Check if the birthday is upcoming
        if (daysUntil <= 7 && !upcomingBirthday) {
            upcomingBirthday = true;
            nearestBirthday = { name: bday.name, days: daysUntil };
             
        }
    });

    // Display the upcoming birthday message if applicable
    if (upcomingBirthday && nearestBirthday) {
        showNotification(nearestBirthday);
    } else {
        upcomingNotification.style.display = 'none';
    }
}

function getDaysUntilBirthday(date) {
    const today = new Date();
    const birthday = new Date(date);
    birthday.setFullYear(today.getFullYear());

    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = birthday - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function showNotification(birthday) {
    upcomingMessage.textContent = `Upcoming birthday: ${birthday.name} in ${birthday.days} day${birthday.days > 1 ? 's' : ''}`;
    upcomingNotification.style.display = 'block';
}

function closeNotification() {
    upcomingNotification.style.display = 'none';
}

function removeBirthday(index) {
    birthdays.splice(index, 1);
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
    displayBirthdays();
}

function startEdit(index) {
    editIndex = index; // Set the index being edited
    displayBirthdays();
}

function updateBirthday(event, index) {
    event.preventDefault(); // Prevent form submission reload
    const updatedName = document.getElementById('editName').value;
    const updatedDate = document.getElementById('editDate').value;

    if (updatedName && updatedDate) {
        birthdays[index] = { name: updatedName, birthday: updatedDate };
        localStorage.setItem('birthdays', JSON.stringify(birthdays));
        editIndex = null; // Clear the edit index
        displayBirthdays();
    }
}

function cancelEdit() {
    editIndex = null; // Clear the edit index
    displayBirthdays();
}

displayBirthdays();