'use strict';
//html homepage from https://mdbootstrap.com/docs/standard/extended/login/

//button selection
const signinButton = document.querySelector('.btn-signin'); //loginAccount
const signupButton = document.querySelector('.btn-signup'); //createAccount
const signupCreateButton = document.querySelector('.btn-signup-create'); //loginAccountAfterSignup
const signinLogoutButton = document.querySelector('.btn-signin-logout'); //logoutAccountAfterSignup
const logoutButton = document.querySelector('.btn-logout'); //logoutAccount
const submitUserDetailsButton = document.querySelector('.btn-edit-user-submit'); //submitDetails

//section selection
const signinSection = document.querySelector('.signin-section');
const signupSection = document.querySelector('.signup-section');
const usernameSection = document.querySelector('.username-section');
const userlistSection = document.querySelector('.userlist-section');
const editUserSection = document.querySelector('.edit-user-section');
const formReset = document.querySelector('.form-reset');

//innerhtml selection
const labelLoginCheck = document.querySelector('.login-check');
const formSubmitCheck = document.querySelector('.form-check');
const formSubmitCheckEditUser = document.querySelector('.form-check-edit-user');
const formSucess = document.querySelector('.sucess-account');

//editUserSection selection
let firstNameEditUser = document.querySelector('.first-name-edit-user');
let lastNameEditUser = document.querySelector('.last-name-edit-user');
let countryEditUser = document.querySelector('.country-edit-user');

//current date
const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

//local-storage logic
let data;
let localStorageArray = [];

let getLocalStorage = function () {
  data = JSON.parse(localStorage.getItem('userdata'));
  // console.log(data);

  if (!data) return;

  localStorageArray = data;
};

let setLocalStorage = function () {
  localStorage.setItem('userdata', JSON.stringify(localStorageArray));
};

getLocalStorage();

//userlist section loop with forEach method
let html;
const displayMovements = function (mov) {
  mov.forEach(function (element, index) {
    // console.log(element, index);

    html = `
  <Section>

        <div class="row">

        <div class="col">
          <input type="text" class="form-control first-name-edit" placeholder="${element.firstName}" aria-label="First name" disabled = 'true'>
        </div>

        <div class="col">
          <input type="text" class="form-control last-name-edit" placeholder="${element.lastName}" aria-label="Last name" disabled = 'true'>
        </div>
        
        <div class="col">
          <input type="text" class="form-control country-edit" placeholder="${element.country}" aria-label="First name" disabled = 'true'>
        </div>

        <div class="col">
        <input type="email" class="form-control" placeholder="${element.emailId}" aria-label="First name" disabled = 'true'>
        </div>

        <div class="col">
          <button id="${index}" onclick = "editBtn(id)" type="button" class="btn btn-primary">Edit</button>
        </div>
        <div class="col">
          <button id="${index}" onclick = "deleteBtn(id)" type="button" class="btn btn-danger">Delete record?</button>
        </div>


      </div>
      
    </Section>

    <br></br>
  `;
    userlistSection.insertAdjacentHTML('afterbegin', html);
  });
};

//Find current logged in account
let currentAccount;
const loginAccount = signinButton.addEventListener('click', function () {
  // console.log('clicked');
  let emailIdSignin = document.querySelector('.email-id-signin').value;
  let passwordSignin = document.querySelector('.password-signin').value;

  currentAccount = localStorageArray.find(
    acc =>
      acc.emailId === emailIdSignin && acc.confirmPassword === passwordSignin
  );
  // console.log(currentAccount);
  if (!currentAccount)
    labelLoginCheck.textContent = `Invalid Username or Password.`;
  if (
    emailIdSignin === currentAccount.emailId &&
    passwordSignin === currentAccount.confirmPassword
  ) {
    signinSection.classList.add('hidden');
    signupSection.classList.add('hidden');
    usernameSection.classList.remove('hidden');
    userlistSection.classList.remove('hidden');
    editUserSection.classList.add('hidden');

    let htmlusername = `
    <Section >
      <div class="alert alert-primary" role="alert">
        Welcome ${currentAccount.firstName}. Here are the list of active users as of ${day}/${month}/${year}.
      </div>
      <div class="notification alert" role="alert">
      </div>
    </Section>
    `;
    usernameSection.insertAdjacentHTML('afterbegin', htmlusername);

    //method to hide current user from userlist
    // let emailIdCurrent = currentAccount.emailId;
    // // console.log(emailIdCurrent);
    // let findIndexMethod = localStorageArray.findIndex(
    //   x => x.emailId === emailIdCurrent
    // );
    // // console.log(localStorageArray);
    // // console.log(findIndexMethod);
    // localStorageArray.splice(findIndexMethod, 1);

    displayMovements(localStorageArray);
  }
});

//signup button behaviour for create new account
const createAccount = signupButton.addEventListener('click', function () {
  // console.log('clicked');
  signinSection.classList.add('hidden');
  signupSection.classList.remove('hidden');
  usernameSection.classList.add('hidden');
  userlistSection.classList.add('hidden');
  editUserSection.classList.add('hidden');
});

//user signin account logic
const loginAccountAfterSignup = signupCreateButton.addEventListener(
  'click',
  function () {
    // console.log('clicked');
    let firstName = document.querySelector('.first-name').value;
    let lastName = document.querySelector('.last-name').value;
    let country = document.querySelector('.country').value;
    let emailId = document.querySelector('.email-id').value;
    let password = document.querySelector('.password').value;
    let confirmPassword = document.querySelector('.confirm-password').value;
    // console.log(firstName, lastName, country, emailId, password, confirmPassword);
    if (
      firstName &&
      lastName &&
      country &&
      emailId &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      let userdata = {
        firstName: firstName,
        lastName: lastName,
        country: country,
        emailId: emailId,
        password: password,
        confirmPassword: confirmPassword,
      };
      // console.log(userdata);

      localStorageArray.push(userdata);
      // console.log(localStorageArray);

      setLocalStorage();

      formSucess.textContent = 'Sucessfully account created.';
      formSubmitCheck.textContent = ``;
      formReset.reset();
    } else {
      formSubmitCheck.textContent = `Please fill all require details.`;
    }
  }
);

//account logout logic after successfully signup first
const logoutAccountAfterSignin = signinLogoutButton.addEventListener(
  'click',
  function () {
    // console.log('clicked');
    signinSection.classList.remove('hidden');
    signupSection.classList.add('hidden');
    usernameSection.classList.add('hidden');
    userlistSection.classList.add('hidden');
    editUserSection.classList.add('hidden');

    location.reload();
  }
);

//logout account anytime while click on logout button
const logoutAccount = logoutButton.addEventListener('click', function () {
  // console.log('clicked');
  signinSection.classList.remove('hidden');
  signupSection.classList.add('hidden');
  usernameSection.classList.add('hidden');
  userlistSection.classList.add('hidden');
  editUserSection.classList.add('hidden');

  location.reload();
});

//delete user from userlist logic
const deleteBtn = function (index) {
  // console.log('deleting..', index);
  // console.log(currentAccount.emailId);
  if (currentAccount.emailId !== localStorageArray[index].emailId) {
    // console.log('solved');
    localStorageArray.splice(index, 1);
    userlistSection.innerHTML = '';
    displayMovements(localStorageArray);
    setLocalStorage();
    document.querySelector('.notification').classList.add('alert-danger');
    document.querySelector('.notification').textContent =
      'User sucessfully deleted.';
    setTimeout(function () {
      document.querySelector('.notification').classList.remove('alert-danger');
      document.querySelector('.notification').textContent = '';
    }, 3000);
  } else {
    document.querySelector('.notification').classList.add('alert-danger');
    document.querySelector('.notification').textContent =
      'Sorry, Please use another account to process request.';
    setTimeout(function () {
      document.querySelector('.notification').classList.remove('alert-danger');
      document.querySelector('.notification').textContent = '';
    }, 3000);
  }
};

//edit user from userlist logic
let userIndex;
const editBtn = function (index) {
  //   console.log('editing..', index);
  userIndex = index;
  // console.log(userIndex);

  signinSection.classList.add('hidden');
  signupSection.classList.add('hidden');
  usernameSection.classList.add('hidden');
  userlistSection.classList.add('hidden');
  editUserSection.classList.remove('hidden');

  //show user details in editusersection as placeholder
  let currentObject = localStorageArray[index];
  // console.log(currentObject);
  // console.log(currentObject.firstName);
  firstNameEditUser.placeholder = currentObject.firstName;
  lastNameEditUser.placeholder = currentObject.lastName;
  countryEditUser.placeholder = currentObject.country;

  // firstNameEdit.removeAttribute('readonly', false);
  // firstNameEdit[index].removeAttribute('disabled');
};

//submit edit user details form logic
const submitDetails = submitUserDetailsButton.addEventListener(
  'click',
  function () {
    // console.log('clicked');

    const firstNameEditUserValue = firstNameEditUser.value;
    const lastNameEditUserValue = lastNameEditUser.value;
    const countryEditUserValue = countryEditUser.value;
    // console.log(
    //   firstNameEditUserValue,
    //   lastNameEditUserValue,
    //   countryEditUserValue
    // );
    if (
      firstNameEditUserValue &&
      lastNameEditUserValue &&
      countryEditUserValue
    ) {
      //setting updated userdata to local storage
      const editUserData = localStorageArray.map((element, index) => {
        //   console.log(element, index);

        if (index == userIndex) {
          // console.log(index);
          // console.log(userIndex);
          return {
            ...element,
            firstName: firstNameEditUserValue,
            lastName: lastNameEditUserValue,
            country: countryEditUserValue,
          };
        }
        return element;
      });
      // console.log(editUserData);
      localStorage.setItem('userdata', JSON.stringify(editUserData));

      signinSection.classList.add('hidden');
      signupSection.classList.add('hidden');
      usernameSection.classList.remove('hidden');
      userlistSection.classList.remove('hidden');
      editUserSection.classList.add('hidden');

      getLocalStorage();
      // console.log(localStorageArray);

      userlistSection.innerHTML = '';

      displayMovements(localStorageArray);

      document.querySelector('.notification').classList.add('alert-danger');
      document.querySelector('.notification').textContent =
        'User sucessfully updated.';
      setTimeout(function () {
        document
          .querySelector('.notification')
          .classList.remove('alert-danger');
        document.querySelector('.notification').textContent = '';
      }, 3000);
    } else {
      formSubmitCheckEditUser.textContent = `Please fill all require details!`;
    }
  }
);
