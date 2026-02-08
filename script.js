// const container_color = document.getElementById("container_1");
// if (container_color){
//     container_color.style.color="blue";
// }

function clicky_function(){
    const container_color = document.getElementById("container_1");
    if (container_color){
        // Toggle between blue and black
        if (container_color.style.color === "blue"){
            container_color.style.color = "black";
        } else{
            container_color.style.color = "blue";
        };
    };
};

const h2btn = document.getElementById("h2_btn");
const header2 = document.getElementById("header_2");
h2btn.addEventListener("click",() => {
    header2.classList.toggle("blue");
});

const h3btn = document.getElementById("h3button_id");
const h3content = document.getElementById("h3_id");
const h3para = document.getElementById("h3_para_id");
let count = 0;

h3btn.addEventListener("click",() => {
    count++;
    h3content.classList.toggle("h3content");
    h3para.textContent = `clicked ${count} times!!`;
    h3content.classList.add("pop");
    setTimeout(() => h3content.classList.remove("pop"), 300);
    console.log(count);
});

const new_input = document.getElementById("input1");
const new_para = document.getElementById("para2");
new_input.addEventListener("input",() => {
    const temp_input = document.getElementById("input1").value;
    new_para.innerText=temp_input;
    console.log(temp_input);
});

const userForm = document.getElementById("user-from");
const userFormSubmit = document.getElementById("user-form-submit");

userFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName=document.getElementById("first-name").value;
    const lastName=document.getElementById("last-name").value;
    const email=document.getElementById("user-email").value;
    const phone=document.getElementById("user-phone").value;
    const address=document.getElementById("user-address").value;

    const gender=document.querySelector('input[name="gender"]:checked');
    const selectedGender=gender ? gender.id:"Not Selected";

    const religion=document.querySelector('input[name="religion"]:checked');
    const selectedReligion=religion ? religion.id:"Not Selected";

    /* const checkedLanguages=document.querySelectorAll('input["name^="user_language"]:checked');
    const languagesArray = Array.from(checkedLanguages);
    const languages = languagesArray.map(
        function(lang){
            return lang.id;
        }
    ); */
    /* above code is the same as below code. */

    const languages = Array.from(document.querySelectorAll('input[name^="user_lanuage"]:checked')).map(lang => lang.id);

    const formData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        gender: selectedGender,
        religion: selectedReligion,
        languages
    };

    // Send to PostgreSQL
    fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success){
            alert('Form submitted successfully! ID: ' + data.id);
            if (userForm) {
                userForm.reset();
            } else {
                // Get all form inputs and clear them manually
                document.getElementById("first-name").value = "";
                document.getElementById("last-name").value = "";
                document.getElementById("user-email").value = "";
                document.getElementById("user-phone").value = "";
                document.getElementById("user-address").value = "";
                document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            }
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(err => alert('Error: ' + err));
});
