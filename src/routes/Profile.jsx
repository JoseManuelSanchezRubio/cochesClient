import Nav from "../Nav";
import { useEffect, useState } from "react";




export default function Profile() {

    let isLogged = false;
    if (localStorage.getItem('token')) isLogged = true;
    const customer = JSON.parse(localStorage.getItem('customer'));
    const [reservations, setReservations] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5218/api/Reservation/customer/${customer.id}`, requestOptions)
            .then(res => res.json())
            .then(data => setReservations(data))

    }, []);

    let reservationsList = reservations.map((item) => {
        return (

            <div className="accordion-item" key={item.id}>
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">
                        Coche: {item.carId}
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="">
                    <ul className="accordion-body ps-5">
                        <li>Fecha de inicio: {item.initialDate}</li>
                        <li>Fecha fin: {item.finalDate}</li>
                        <li>Sucursal de recogida: {item.branchId}</li>
                        <li>Sucursal de devolución: {item.returnBranchId}</li>
                        <li>Número de conductores: {item.numberOfDrivers}</li>
                        <li>Es internacional: {item.isInternational ? "Si" : "No"}</li>
                        <li>Tiene GPS: {item.hasGPS ? "Si" : "No"}</li>

                    </ul>
                </div>
            </div>


        )
    })

    return (
        <div>
            <Nav isLogged={isLogged} />
            <div className="p-5">
                <h1 className="mb-4">Bienvenido, {customer.name}</h1>
                <h4>Información personal:</h4>
                <div className="list-group w-25">
                    <div className="list-group-item list-group-item-action">Nombre: {customer.name}</div>
                    <div className="list-group-item list-group-item-action">Apellidos: {customer.surname}</div>
                    <div className="list-group-item list-group-item-action">Email: {customer.email}</div>
                    <div className="list-group-item list-group-item-action">Reservas:
                        <div className="accordion my-2">
                            {reservationsList}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}