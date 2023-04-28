import { useState, useEffect } from "react";


export default function BranchesAdd() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    function saveChanges(e) {
        e.preventDefault();
        if (name == "" || location == "") {
            alert("Has de rellenar todos los campos");
        } else {
            fetch(`http://localhost:5218/api/Branch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    location: location
                })
            })
                .then(res => res.json())
                .then(res => console.log(res))

            alert('Sucursal agregada exitosamente');
            window.location.reload();
        }
    }




    return (

        <div>
            <h3>Añadir sucursal</h3>
            <form>
                <div className="form-group mb-2">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="brand">Localización</label>
                    <input type="text" className="form-control" id="location" placeholder="Localización" onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-warning mt-3 mb-3" onClick={(e) => saveChanges(e)}>Añadir</button>
            </form>
        </div>
    )
}