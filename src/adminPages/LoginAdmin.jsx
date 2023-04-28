import { useState } from "react";
import { Link } from "react-router-dom";
import NavAdmin from "../NavAdmin";


export default function LoginAdmin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let token;



    function checkLogin(data) {
        if (data.status) {
            token = JSON.parse(atob(data.token.split('.')[1]));
            //console.log(token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
            if (token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'admin') {
                sessionStorage.setItem('adminToken', data.token);
                sessionStorage.setItem('section', 'categorias');
                window.location.href = '/admin';
            } else {
                alert("You are not an admin");
            }
        } else {
            alert(data.token);
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (email == '') return alert("Debes introducir un email");
        if (password == '') return alert("Debes introducir una contraseña");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        fetch('http://localhost:5218/api/Customer/login', requestOptions)
            .then(response => response.json())
            .then(data => checkLogin(data)
            );

    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;

    return (
        <div>
            <NavAdmin />
            <section className="d-flex justify-content-center pt-5">
                <div>
                    <h1 className="mb-4">Iniciar sesión</h1>
                    <form style={{ width: "30vw" }}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example1">Email</label>
                            <input type="email" id="form2Example1" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>


                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example2">Contraseña</label>
                            <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-warning btn-block mb-4" onClick={handleSubmit}>Iniciar sesión</button>

                    </form>
                </div>
            </section>
        </div>
    )
}