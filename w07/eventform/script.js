document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('ticketForm');
  var firstName = document.getElementById('first');
  var lastName = document.getElementById('last');
  var email = document.getElementById('email');
  var type = document.getElementById('type');
  var dateInput = document.getElementById('date');
  var studentId = document.getElementById('studentId');
  var guestCode = document.getElementById('guestCode');
  var studentWrap = document.querySelector('.student-id-wrap');
  var guestWrap = document.querySelector('.guest-code-wrap');
  var errorsEl = document.getElementById('errors');
  var ticketEl = document.getElementById('ticket');
  var submitted = false;

  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');
  var todayString = year + '-' + month + '-' + day;

  dateInput.min = todayString;
  if (!dateInput.value || dateInput.value < todayString) {
    dateInput.value = todayString;
  }

  function checkEmail() {
    var value = email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (value === '') {
      email.setCustomValidity('');
    } else if (pattern.test(value)) {
      email.setCustomValidity('');
    } else {
      email.setCustomValidity('Please enter a valid email address.');
    }
  }

  function showHideFields() {
    if (type.value === 'Student') {
      studentWrap.classList.remove('hidden');
      guestWrap.classList.add('hidden');
      studentId.required = true;
      guestCode.required = false;
    } else {
      studentWrap.classList.add('hidden');
      guestWrap.classList.remove('hidden');
      studentId.required = false;
      guestCode.required = true;
    }
  }

  function checkStudentId() {
    var value = studentId.value.trim();

    if (type.value !== 'Student') {
      studentId.setCustomValidity('');
    } else if (value === '') {
      studentId.setCustomValidity('Student ID is required for Students.');
    } else if (/^\d{9}$/.test(value)) {
      studentId.setCustomValidity('');
    } else {
      studentId.setCustomValidity('Student ID must be a 9 digit number for Students.');
    }
  }

  function checkGuestCode() {
    var value = guestCode.value.trim();

    if (type.value !== 'Guest') {
      guestCode.setCustomValidity('');
    } else if (value === '') {
      guestCode.setCustomValidity('Guest Code is required for Guests.');
    } else if (value === 'EVENT131') {
      guestCode.setCustomValidity('');
    } else {
      guestCode.setCustomValidity('Guest Code must be EVENT131 for Guests.');
    }
  }

  function clearMessages() {
    errorsEl.innerHTML = '';
    errorsEl.style.display = 'none';
    ticketEl.innerHTML = '';
    ticketEl.style.display = 'none';
  }

  function markError(input) {
    var field = input.closest('.field');
    if (field) {
      field.classList.add('error');
    }
  }

  function clearError(input) {
    var field = input.closest('.field');
    if (field) {
      field.classList.remove('error');
    }
  }

  function updateFieldStyles() {
    var fields = [firstName, lastName, email, dateInput, studentId, guestCode];
    for (var i = 0; i < fields.length; i++) {
      clearError(fields[i]);
      if (!fields[i].checkValidity()) {
        markError(fields[i]);
      }
    }
  }

  function showErrors(list) {
    var ul = document.createElement('ul');
    for (var i = 0; i < list.length; i++) {
      var li = document.createElement('li');
      li.textContent = list[i];
      ul.appendChild(li);
    }

    errorsEl.appendChild(ul);
    errorsEl.style.display = 'block';
  }

  function makeRow(label, value) {
    var row = document.createElement('div');
    row.className = 'ticket-row';

    var labelDiv = document.createElement('div');
    labelDiv.className = 'ticket-label';
    labelDiv.textContent = label;

    var valueDiv = document.createElement('div');
    valueDiv.className = 'ticket-value';
    valueDiv.textContent = value;

    row.appendChild(labelDiv);
    row.appendChild(valueDiv);
    return row;
  }

  function makeTicket() {
    var ticketCard = document.createElement('div');
    ticketCard.className = 'ticket-card';

    ticketCard.appendChild(makeRow('Name', firstName.value.trim() + ' ' + lastName.value.trim()));
    ticketCard.appendChild(makeRow('Email', email.value.trim()));
    ticketCard.appendChild(makeRow('Type', type.value));
    ticketCard.appendChild(makeRow('Event Date', dateInput.value));

    if (type.value === 'Student') {
      ticketCard.appendChild(makeRow('Student ID#', studentId.value.trim()));
    }

    if (type.value === 'Guest') {
      ticketCard.appendChild(makeRow('Guest Code', guestCode.value.trim()));
    }

    ticketEl.appendChild(ticketCard);
    ticketEl.style.display = 'block';
  }

  checkEmail();
  showHideFields();
  checkStudentId();
  checkGuestCode();

  type.addEventListener('change', function () {
    checkEmail();
    showHideFields();
    checkStudentId();
    checkGuestCode();
    if (submitted) {
      updateFieldStyles();
    }
  });

  firstName.addEventListener('input', function () {
    if (submitted) {
      updateFieldStyles();
    }
  });

  lastName.addEventListener('input', function () {
    if (submitted) {
      updateFieldStyles();
    }
  });

  email.addEventListener('input', function () {
    email.setCustomValidity('');
    checkEmail();
    if (submitted) {
      updateFieldStyles();
    }
  });

  dateInput.addEventListener('input', function () {
    if (submitted) {
      updateFieldStyles();
    }
  });

  studentId.addEventListener('input', function () {
    checkStudentId();
    if (submitted) {
      updateFieldStyles();
    }
  });

  guestCode.addEventListener('input', function () {
    checkGuestCode();
    if (submitted) {
      updateFieldStyles();
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    submitted = true;
    clearMessages();
    checkEmail();
    showHideFields();
    checkStudentId();
    checkGuestCode();
    updateFieldStyles();

    var invalidList = [];
    var inputs = [firstName, lastName, email, dateInput, studentId, guestCode];

    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        invalidList.push(inputs[i].validationMessage);
      }
    }

    if (invalidList.length > 0) {
      showErrors(invalidList);
      if (!firstName.checkValidity()) {
        firstName.focus();
      } else if (!lastName.checkValidity()) {
        lastName.focus();
      } else if (!email.checkValidity()) {
        email.focus();
      } else if (!dateInput.checkValidity()) {
        dateInput.focus();
      } else if (!studentId.checkValidity()) {
        studentId.focus();
      } else if (!guestCode.checkValidity()) {
        guestCode.focus();
      }
      return;
    }

    makeTicket();
  });
});