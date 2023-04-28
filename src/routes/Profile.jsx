import Nav from "../Nav";
import { useEffect, useState } from "react";




export default function Profile() {

    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        try {
            let token = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1]))
            isLogged = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'customer' || token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'admin';

        } catch {
            isLogged = false;
        }
    }

    if (!isLogged) return window.location.href = '/login';
    const customer = JSON.parse(sessionStorage.getItem('customer'));
    const [reservations, setReservations] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + sessionStorage.getItem('token')
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
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#id' + item.id} aria-expanded="true">
                        Coche: {item.carId}
                    </button>
                </h2>
                <div id={'id' + item.id} className="accordion-collapse collapse" data-bs-parent="">
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
            <div className="pt-5 container">
                <h1 className="mb-4">Bienvenido/a, {customer.name}</h1>
                <h4>Información personal:</h4>
                <div className="list-group">
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