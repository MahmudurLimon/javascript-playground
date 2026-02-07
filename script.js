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

const userForm = document.getElementById("user-form");
if (userForm){
    userForm.addEventListener("submit",(e) => {
        e.preventDefault();
        const fd = new FormData(userForm);
        for (const [name,value] of fd.entries()){
            console.log(name,value);
        };
    });
};
