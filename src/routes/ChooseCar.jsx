import React from 'react';
import { useState, useEffect } from 'react';
import CarList from '../CarList.jsx';
import Nav from '../Nav.jsx';



export default function ChooseCar() {


    const [typeCars, setTypeCars] = useState([]);
    let cars = []
    const [change, setChange] = useState('');
    const [fuel, setFuel] = useState('');




    useEffect(() => {
        const bookingData = sessionStorage.getItem('bookingData');
        const bookingDataJSON = JSON.parse(bookingData);

        const branchId = +bookingDataJSON[0];
        const returnBranchId = +bookingDataJSON[1];
        const initialDate = bookingDataJSON[2];
        const finalDate = bookingDataJSON[3];
        const age = bookingDataJSON[4];
        const inAnotherBranch = bookingDataJSON[5];
        fetch(`http://localhost:5218/api/Car/availability/${branchId}/${initialDate}/${finalDate}`)
            .then(res => res.json())
            .then(data => setTypeCars(data))

    }, []);


    /* console.log(typeCars); */
    for (let i = 0; i < typeCars.length; i++) {

        cars.push(typeCars[i])
        if (change == 'automatic') {
            cars = cars.filter(car => car.isAutomatic == true);
        }
        if (change == 'manual') {
            cars = cars.filter(car => car.isAutomatic == false);
        }
        if (fuel == 'gasoline') {
            cars = cars.filter(car => car.isGasoline == true);
        }
        if (fuel == 'diesel') {
            cars = cars.filter(car => car.isGasoline == false);
        }

    }

    const customer = (sessionStorage.getItem("customer"));
    const customerId = JSON.parse(customer).id;


    const book = (e) => {
        let carSelected = sessionStorage.getItem("carSelected");

        if (carSelected == 0) return alert("Debes seleccionar un coche");

        if (!isLogged) {
            alert("Debes iniciar sesión");
            window.location.href = "/login";
        }



        const bookingData = sessionStorage.getItem('bookingData');
        const bookingDataJSON = JSON.parse(bookingData);

        const branchId = +bookingDataJSON[0];
        const returnBranchId = +bookingDataJSON[1];
        const initialDate = bookingDataJSON[2];
        const finalDate = bookingDataJSON[3];
        const age = bookingDataJSON[4];
        const inAnotherBranch = bookingDataJSON[5];

        console.log('pickup: ', branchId);
        console.log('return: ', returnBranchId);
        console.log('inAnotherBranch: ', inAnotherBranch);

        if (inAnotherBranch) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    initialDate: initialDate,
                    finalDate: finalDate,
                    isInternational: isInternational,
                    hasGps: hasGps,
                    numberOfDrivers: numberOfDrivers,
                    typeCarId: carSelected,
                    customerId: customerId,
                    pickUpBranchId: branchId,
                    returnBranchId: returnBranchId,

                })
            };
            console.log(carSelected);
            console.log(requestOptions);
            fetch('http://localhost:5218/api/Reservation/reservationOnDifferentBranch', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    initialDate: initialDate,
                    finalDate: finalDate,
                    isInternational: isInternational,
                    hasGps: hasGps,
                    numberOfDrivers: numberOfDrivers,
                    typeCarId: carSelected,
                    customerId: customerId,
                    branchId: branchId,

                })
            };
            console.log(carSelected);
            console.log(requestOptions);
            fetch('http://localhost:5218/api/Reservation/reservationOnSameBranch', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
        }
        alert("Reserva realizada con éxito");
        window.location.href = "/profile";
    }

    const [isInternational, setIsInternational] = useState(false);
    const checkIsInternational = function () {
        setIsInternational(!isInternational);
    }
    const [hasGps, setHasGps] = useState(false);
    const checkHasGps = function () {
        setHasGps(!hasGps);
    }

    const [numberOfDrivers, setNumberOfDrivers] = useState(1);


    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        let token = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1]))
        isLogged = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'customer';
    }

    return (
        <div>
            <Nav isLogged={isLogged} />
            <section className='container d-flex justify-content-center pt-5'>
                <div>
                    <h1 className='mb-4 text-center'>Elige el coche que necesites</h1>
                    <div className="d-flex justify-content-center">
                        <div className="form-floating me-2">
                            <select className="form-select" id="typeCar" style={{ width: '25vw' }} onChange={(event) => { setChange(event.target.value) }}>
                                <option value="all" defaultValue='all'>Todos</option>
                                <option value="automatic">Automático</option>
                                <option value="manual">Manual</option>
                            </select>
                            <label htmlFor="typeCar">Tipo de cambio</label>
                        </div>
                        <div className="form-floating">
                            <select className="form-select" id="typeFuel" style={{ width: '25vw' }} onChange={(event) => { setFuel(event.target.value) }}>
                                <option value="all" defaultValue='all'>Todos</option>
                                <option value="diesel">Diésel</option>
                                <option value="gasoline">Gasolina</option>
                            </select>
                            <label htmlFor="typeFuel">Tipo de combustible</label>
                        </div>


                    </div>
                    <br />
                    <CarList cars={cars} isInternational={isInternational} hasGps={hasGps} numberOfDrivers={numberOfDrivers} />
                    <br />
                    <div>
                        <h1>Servicios adicionales</h1>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="international" onChange={checkIsInternational} id="international" />
                            <label className="form-check-label">
                                Quiero conducir por Portugal, Francia o Andorra
                            </label>
                        </div>
                        <div className="my-2"></div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="gps" onChange={checkHasGps} id="gps" />
                            <label className="form-check-label">
                                Añadir GPS
                            </label>
                        </div>
                        <div className="my-2"></div>
                        <div className="form-floating">
                            <select className="form-select" id="drivers" style={{ width: '25vw' }} onChange={(event) => { setNumberOfDrivers(event.target.value) }}>
                                <option value="1" defaultValue='1'>Un conductor</option>
                                <option value="2">Dos conductores</option>
                                <option value="3">Tres conductores</option>
                            </select>
                            <label htmlFor="drivers">Número de conductores</label>
                        </div>
                        <button className="btn btn-warning mt-3" onClick={book}>Reservar</button>
                    </div>
                </div>
            </section>
        </div>
    )
}