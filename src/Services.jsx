import { useState } from "react";


//cambiar Services para que acepte typeCars en vez de cars

export default function Services() {

    let isLogged = false;
    if (localStorage.getItem('token')) isLogged = true;

    const handleClick = (e) => {
        let carSelected = localStorage.getItem("carSelected");

        if (carSelected == 0) return alert("Debes seleccionar un coche");

        if (!isLogged) {
            alert("Debes iniciar sesión");
            window.location.href = "/login";
        }

        const bookingData = localStorage.getItem('bookingData');
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
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    initialDate: initialDate,
                    finalDate: finalDate,
                    isInternational: isInternational,
                    hasGps: hasGps,
                    numberOfDrivers: numberOfDrivers,
                    typeCarId: carSelected,
                    customerId: 1, //harcoded
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
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    initialDate: initialDate,
                    finalDate: finalDate,
                    isInternational: isInternational,
                    hasGps: hasGps,
                    numberOfDrivers: numberOfDrivers,
                    typeCarId: carSelected,
                    customerId: 1, //harcoded
                    branchId: branchId,

                })
            };
            console.log(carSelected);
            console.log(requestOptions);
            fetch('http://localhost:5218/api/Reservation/reservationOnSameBranch', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
        }
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



    return (
        <div>
            <h1>Servicios adicionales</h1>
            <div className="form-check me-4">
                <input className="form-check-input" type="checkbox" value="international" onChange={checkIsInternational} id="international" />
                <label className="form-check-label">
                    Quiero conducir por Portugal, Francia o Andorra
                </label>
            </div>
            <div className="form-check me-4">
                <input className="form-check-input" type="checkbox" value="gps" onChange={checkHasGps} id="gps" />
                <label className="form-check-label">
                    Añadir GPS
                </label>
            </div>
            <div className="form-floating w-25 me-2">
                <select className="form-select" id="drivers" aria-label="" onChange={(event) => { setNumberOfDrivers(event.target.value) }}>
                    <option value="1" defaultValue='1'>Un conductor</option>
                    <option value="2">Dos conductores</option>
                    <option value="3">Tres conductores</option>
                </select>
                <label htmlFor="drivers">Número de conductores</label>
            </div>
            <button className="btn btn-warning mt-3" onClick={handleClick}>Reservar</button>
        </div>
    )
}