import React from 'react';
import { useState, useEffect } from 'react';
import CarList from '../CarList.jsx';
import Services from '../Services.jsx';
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
                    <CarList cars={cars} />
                    <br />
                    <Services />
                </div>
            </section>
        </div>
    )
}