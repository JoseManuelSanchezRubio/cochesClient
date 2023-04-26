import { useState } from "react";
import Nav from "../Nav";

export default function Logup() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState('1');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function checkLogup(data) { //falta comprobar si el email ya esta registrado en el backend
        if (data.status) {
            alert("Cuenta creada correctamente");
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name, surname, age, email, password, confirmPassword);

        if (name == "" || surname == "" || age == "" || email == "" || password == "" || confirmPassword == "") return alert("Todos los campos son obligatorios");
        if (password !== confirmPassword) return alert("Las contraseñas no coinciden");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                age: age,
                email: email,
                password: password
            })
        };
        fetch('http://localhost:5218/api/Customer/', requestOptions)
            .then(response => response.json())
            .then(data => checkLogup(data)
            );
    }


    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;


    return (
        <div>
            <Nav isLogged={isLogged} />
            <div className="p-5">
                <h1 className="mb-4">Crear cuenta</h1>
                <form className="w-25">
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name">Nombre</label>
                        <input type="email" id="name" className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="surname">Apellidos</label>
                        <input type="email" id="surname" className="form-control" onChange={(e) => setSurname(e.target.value)} />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="age">Edad</label>
                        <select className="form-select" aria-label="" id="age" onChange={(e) => setAge(e.target.value)}>
                            <option value='1'>19-24</option>
                            <option value='2'>25-75</option>
                            <option value='3'>75+</option>
                        </select>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>


                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="confirmPass">Repite contraseña</label>
                        <input type="password" id="confirmPass" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-warning btn-block mb-4" onClick={handleSubmit}>Crear cuenta</button>

                </form>
            </div>
        </div>
    )
}