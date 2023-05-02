let registerContainer = document.getElementById("register_container");
let login_container = document.getElementById("login_container");
let home_container = document.getElementById("home_container");

let create_acount_link = document.getElementById("create_acount_link");
create_acount_link.addEventListener('click',goToRegister);

let btn_create_account = document.getElementById("btn_create_account");
btn_create_account.addEventListener('click',()=>registerAccount());

let btn_iniciar_sesion = document.querySelector("#btn_iniciar");
console.log(btn_iniciar_sesion);
btn_iniciar_sesion.addEventListener('click',()=>login());


async function login() {
    let username = document.getElementById("username");
    let value_username = username.value;
    let password = document.getElementById("password");
    let value_password = password.value;
    
    console.log(value_password);
    console.log(value_username);
    const response = await fetch("https://pruebatecnicabackend-production.up.railway.app/login",
    {method:"POST",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body:JSON.stringify({user:value_username, password:value_password})});
    const data = await response.json();
    console.log(data);
    if(data.response){
        home_container.classList.remove("hiden");
        login_container.classList.add("hiden");
        loadUsers(data.usuario_tipo);
    }
    
}

async function loadUsers(userType){
    let tabla_container = document.getElementById("tabla_container");
    const response = await fetch(`https://pruebatecnicabackend-production.up.railway.app/usuarios?usuario_tipo=${userType}`);
    const data = await response.json();
    console.log(data);
    data.forEach(element => {
        const row = document.createElement("tr");
        const nombre = document.createElement("td")
        const tipo = document.createElement("td");
        nombre.textContent = element.nombre;
        tipo.textContent = element.tipo_usuario;
        row.append(nombre, tipo);
        tabla_container.appendChild(row);
    });  
}

async function registerAccount(){
    let error_message = document.getElementById("error_message");
    error_message.innerHTML = "";
    let name_register = document.getElementById("name_register");
    let value_name_register = name_register.value;
    let password_register = document.getElementById("password_register");
    let value_password_register =password_register.value;
    let type_of_user = document.getElementById("select_type");
    let value_type_of_user = type_of_user.value;
    const response = await fetch("https://pruebatecnicabackend-production.up.railway.app/register",
    {method:"POST",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body:JSON.stringify({user:value_name_register, password:value_password_register, tipo_usuario:value_type_of_user})});
    const data = await response.json();
      if(data.response){
        login_container.classList.remove("hiden");
        registerContainer.classList.add("hiden"); 
      }else{
          error_message.innerHTML = data.message;
      }
}

function goToRegister(evento) {
    evento.preventDefault();
    login_container.classList.add("hiden");
    registerContainer.classList.remove("hiden");
}
