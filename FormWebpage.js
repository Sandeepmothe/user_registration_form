let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let workingStatusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let myFormEl = document.getElementById("myForm");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

nameEl.addEventListener("change", function (event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }

    formData.name = event.target.value;
});

emailEl.addEventListener("change", function (event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }

    formData.email = event.target.value;
});

workingStatusEl.addEventListener("change", function (event) {
    formData.status = event.target.value;
});

genderMaleEl.addEventListener("change", function (event) {
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function (event) {
    formData.gender = event.target.value;
});

function validateFormData(formData) {
    formData.name = formData.name.trim();
    formData.email = formData.email.trim();
    let { name, email } = formData;
    let is_valid = true
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
        is_valid = false
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
        is_valid = false
    }
    return is_valid
}

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
                "Bearer f380f4b9bae88ed922e9490e2ae0a080940b3f950d313244eb641866b1913cb9",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {

                if (jsonData.data[0].field === "name") {
                    nameErrMsgEl.textContent = jsonData.data[0].message;
                }
                if (jsonData.data[0].field === "email") {
                    // emailErrMsgEl.textContent = jsonData.data[0].message;
                    if (jsonData.data[0].message === "has already been taken"){
                        emailErrMsgEl.textContent = "Email already exist";
                    }
                    if (jsonData.data[0].message === "is invalid"){
                        emailErrMsgEl.textContent = "Enter valid email";
                    }
                }


            }
            if (jsonData.code === 201) {
                alert("Form Successfully Submitted")
                myFormEl.reset();
                formData.name = "";
                formData.email = "";
                formData.status = "Active";
                formData.gender = "Male";
            }
        });
}

myFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateFormData(formData)) {
        submitFormData(formData);
    }

});
