document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('ticketForm');
  const type = document.getElementById('type');
  const studentWrap = document.querySelector('.student-id-wrap');
  const studentId = document.getElementById('studentId');
  const guestWrap = document.querySelector('.guest-code-wrap');
  const guestCode = document.getElementById('guestCode');
  const dateInput = document.getElementById('date');

  // set minimum date to today to prevent past dates
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayISO = `${yyyy}-${mm}-${dd}`;
  if(dateInput){
    dateInput.min = todayISO;
    if(!dateInput.value || dateInput.value < dateInput.min) dateInput.value = dateInput.min;
  }

  function toggleConditionalFields(){
    const v = type.value.toLowerCase();
    if(v.includes('student')){
      studentWrap.classList.remove('hidden');
    } else {
      studentWrap.classList.add('hidden');
      studentWrap.classList.remove('error');
    }
    if(v.includes('guest')){
      guestWrap.classList.remove('hidden');
    } else {
      guestWrap.classList.add('hidden');
      guestWrap.classList.remove('error');
    }
  }

  toggleConditionalFields();
  type.addEventListener('change', toggleConditionalFields);

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Validate required fields and show messages in the errors area
    const errorsEl = document.getElementById('errors');
    const ticketEl = document.getElementById('ticket');
    errorsEl.innerHTML = '';
    ticketEl.innerHTML = '';
    errorsEl.style.display = 'none';
    ticketEl.style.display = 'none';
    // clear previous error classes
    document.querySelectorAll('.conditional-wrap').forEach(el=>el.classList.remove('error'));

    const v = type.value.toLowerCase();
    const errors = [];
    const firstVal = document.getElementById('first').value.trim();
    const lastVal = document.getElementById('last').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const dateVal = document.getElementById('date').value;

    if(!firstVal) errors.push('First name is required.');
    if(!lastVal) errors.push('Last name is required.');
    if(!emailVal) errors.push('Email is required.');
    else if(!/^\S+@\S+\.\S+$/.test(emailVal)) errors.push('Email must be a valid email address.');
    if(!dateVal) errors.push('Event date is required.');
    else if(dateInput && dateVal < dateInput.min) errors.push('Event date cannot be before today.');

    if(v.includes('student') && !studentId.value.trim()){
      errors.push('Student I# is required for Students.');
      studentWrap.classList.add('error');
    }
    if(v.includes('guest') && !guestCode.value.trim()){
      errors.push('Guest Code is required for Guests.');
      guestWrap.classList.add('error');
    }

    if(errors.length){
      errorsEl.style.display = 'block';
      const ul = document.createElement('ul');
      errors.forEach(msg=>{ const li = document.createElement('li'); li.textContent = msg; ul.appendChild(li); });
      errorsEl.appendChild(ul);
      // focus first invalid field
      if(v.includes('student') && studentWrap.classList.contains('error')){
        studentId.focus();
      } else if(v.includes('guest') && guestWrap.classList.contains('error')){
        guestCode.focus();
      } else if(!firstVal) document.getElementById('first').focus();
      else if(!lastVal) document.getElementById('last').focus();
      else if(!emailVal) document.getElementById('email').focus();
      return;
    }

    // success — build ticket display and clear errors
    const ticketCard = document.createElement('div');
    ticketCard.className = 'ticket-card';
    const addRow = (label, val)=>{
      const r = document.createElement('div'); r.className='ticket-row';
      const l = document.createElement('div'); l.className='ticket-label'; l.textContent = label;
      const vdiv = document.createElement('div'); vdiv.className='ticket-value'; vdiv.textContent = val;
      r.appendChild(l); r.appendChild(vdiv); ticketCard.appendChild(r);
    };
    addRow('Name', firstVal + ' ' + lastVal);
    addRow('Email', emailVal);
    addRow('Type', type.value);
    addRow('Event Date', dateVal);
    if(v.includes('student')) addRow('Student I#', studentId.value.trim());
    if(v.includes('guest')) addRow('Guest Code', guestCode.value.trim());

    ticketEl.appendChild(ticketCard);
    ticketEl.style.display = 'block';
  });
  // remove error state when user starts typing
  studentId.addEventListener('input', ()=>{
    if(studentId.value.trim()) studentWrap.classList.remove('error');
  });
  guestCode.addEventListener('input', ()=>{
    if(guestCode.value.trim()) guestWrap.classList.remove('error');
  });
});
