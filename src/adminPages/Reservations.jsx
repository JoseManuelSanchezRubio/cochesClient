import { useState, useEffect } from "react"

//////////////////////////////// añadir que cuando pulses en una reserva, se muestra informacion adicional
export default function Reservations() {

    useEffect(() => {
        fetch(`http://localhost:5218/api/Reservation/`)
            .then(res => res.json())
            .then(data => {
                setReservationsList(refreshTable(data));
                setReservations(data);
            })
    }, [])

    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const [reservations, setReservations] = useState([])
    const [reservationsList, setReservationsList] = useState([])



    function refreshTable(list) {
        let table = list.map(item => {
            const initialDateParsed = new Date(item.initialDate).toLocaleDateString('es-ES', dateOptions);
            const finalDateParsed = new Date(item.finalDate).toLocaleDateString('es-ES', dateOptions);
            return (
                <tbody key={item.id}>
                    <tr>
                        <th scope="row">{item.id}</th>
                        <td>{initialDateParsed}</td>
                        <td>{finalDateParsed}</td>
                        <td>{item.branchId}</td>
                        <td>{item.returnBranchId}</td>
                        <td>{item.carId}</td>
                        <td>{item.customerId}</td>
                        <td>{item.numberOfDrivers}</td>
                        <td>{item.hasGPS ? 'Sí' : 'No'}</td>
                        <td>{item.isInternational ? 'Sí' : 'No'}</td>
                    </tr>
                </tbody>
            )
        })
        return table;
    }

    function searchString(e) {
        let property = e.target.id;
        let value = e.target.value;
        let filter = reservations.filter(reservation => {
            return reservation[property].toLowerCase().includes(value.toLowerCase()) || reservation[property].toLowerCase().includes(value.toLowerCase())
        })
        setReservationsList(refreshTable(filter));
    }

    function searchNumeric(e) {
        let property = e.target.id;
        if (e.target.value == '') {
            setReservationsList(refreshTable(reservations));
        } else {
            let filter = reservations.filter(reservation => {
                return reservation[property] == e.target.value
            })
            setReservationsList(refreshTable(filter));
        }
    }

    return (
        <div>
            <h3>Reservas</h3>
            <form>


                <div className="d-flex">
                    <div className="col me-3">
                        <input type="text" id='id' className="form-control mb-2" placeholder="Filtrar por id" onChange={(e) => searchNumeric(e)}></input>
                        <input type="text" id='initialDate' className="form-control mb-2" placeholder="Filtrar por fecha inicial" onChange={(e) => searchString(e)}></input>

                    </div>
                    <div className="col me-3">
                        <input type="text" id='finalDate' className="form-control mb-2" placeholder="Filtrar por fecha final" onChange={(e) => searchString(e)}></input>
                        <input type="text" id='branchId' className="form-control mb-2" placeholder="Filtrar por sucursal de recogida" onChange={(e) => searchNumeric(e)}></input>

                    </div>
                    <div className="col me-3">
                        <input type="text" id='returnBranchId' className="form-control mb-2" placeholder="Filtrar por sucursal de devolución" onChange={(e) => searchNumeric(e)}></input>
                        <input type="text" id='carId' className="form-control mb-2" placeholder="Filtrar por coche" onChange={(e) => searchNumeric(e)}></input>
                    </div>
                    <div className="col">
                        <input type="text" id='customerId' className="form-control mb-2" placeholder="Filtrar por cliente" onChange={(e) => searchNumeric(e)}></input>
                        <input type="text" id='numberOfDrivers' className="form-control mb-2" placeholder="Filtrar por conductores" onChange={(e) => searchNumeric(e)}></input>
                    </div>
                </div>
            </form>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha inicial</th>
                        <th scope="col">Fecha final</th>
                        <th scope="col">Sucursal de recogida</th>
                        <th scope="col">Sucursal de devolución</th>
                        <th scope="col">Coche</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Conductores</th>
                        <th scope="col">GPS</th>
                        <th scope="col">Internacional</th>
                    </tr>
                </thead>
                {reservationsList}
            </table>

        </div>
    )
}