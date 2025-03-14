//----------------------------------------------------------second code countdown modified


const notificationbutton=document.getElementById('notificationbutton')
const birthdayList = document.getElementById('birthdayList');
const upcomingNotification = document.getElementById('upcomingNotification');
const upcomingMessage = document.getElementById('upcomingMessage');
let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
let editIndex = null; // Track which birthday is being edited

function displayBirthdays() {
    birthdayList.innerHTML = '';
    let upcomingBirthday = false;
    let nearestBirthday = null;

    birthdays.sort((a, b) => getTimeUntilBirthday(a.birthday).totalMilliseconds - getTimeUntilBirthday(b.birthday).totalMilliseconds);

    birthdays.forEach((bday, index) => {
        const { months, days, hours, isWithinAWeek } = getTimeUntilBirthday(bday.birthday);

        // Create a Bootstrap card
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 birthday-card';

        card.innerHTML = `
            <div class="card ${isWithinAWeek ? 'highlight' : ''}">
                <div class="card-body text-center">
                    <h5 class="card-title">${bday.name}</h5>
                    <p class="card-text">${formatDate(bday.birthday)}</p>
                    <p class="card-text">${isWithinAWeek ? `${days} day${days !== 1 ? 's' : ''} and ${hours} hour${hours !== 1 ? 's' : ''} left` : `${months} month${months !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''}, and ${hours} hour${hours !== 1 ? 's' : ''} left`}</p>
                    <button class="btn btn-sm me-2" onclick="startEdit(${index})" id="color">Edit</button>
                    <button class="btn btn-sm" onclick="removeBirthday(${index})" id="color">Remove</button>
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
                    <button type="submit" class="btn btn-sm" id="color">Save</button>
                    <button type="button" class="btn btn-sm" id="color" onclick="cancelEdit()">Cancel</button>
                </form>
            `;
            card.appendChild(editForm);
        }

        birthdayList.appendChild(card);

        // Check if the birthday is upcoming
        if (isWithinAWeek && !upcomingBirthday) {
            upcomingBirthday = true;
            nearestBirthday = { name: bday.name, days, hours };
        }
    });

    // Display the upcoming birthday message if applicable
    if (upcomingBirthday && nearestBirthday) {
        showNotification(nearestBirthday);
    } else {
        upcomingNotification.style.display = 'none';
    }
}

function getTimeUntilBirthday(date) {
    const today = new Date();
    const birthday = new Date(date);
    birthday.setFullYear(today.getFullYear());

    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1);
    }

    const totalMilliseconds = birthday - today;
    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));

    const months = Math.floor(totalDays / 30); // Approximation
    const days = totalDays % 30; // Remaining days after months
    const hours = totalHours % 24; // Remaining hours after days

    const isWithinAWeek = totalDays <= 7;

    return { months, days, hours, totalMilliseconds, isWithinAWeek };
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function showNotification(birthday) {
    // Save the notification details to localStorage
    localStorage.setItem('upcomingBirthday', JSON.stringify(birthday));
    notificationbutton.style.background="red"
    

    // Display notification on the current page
    // upcomingMessage.textContent = `Upcoming birthday: ${birthday.name} in ${birthday.days} day${birthday.days !== 1 ? 's' : ''} and ${birthday.hours} hour${birthday.hours !== 1 ? 's' : ''}`;
    // upcomingNotification.style.display = 'block';
}



// function showNotification(birthday) {

//     upcomingMessage.textContent = `Upcoming birthday: ${birthday.name} in ${birthday.days} day${birthday.days !== 1 ? 's' : ''} and ${birthday.hours} hour${birthday.hours !== 1 ? 's' : ''}`;
//     upcomingNotification.style.display = 'block';
// }

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


