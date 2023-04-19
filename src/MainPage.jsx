import { useState, useEffect } from "react";
import './MainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


export function MainPage() {

    //Recuperamos las sucursales de la base de datos
    const [branches, setBranches] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5218/api/Branch')
            .then(res => res.json())
            .then(data => setBranches(data))
    }, []);

    const branchesList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id} onChange={(event) => { setBranchId(event.target.value) }}>
                {branch.name}
            </option>
        )
    })

    //Esto es para que aparezca en la pantalla el select de devolución en otra sucursal
    const [inAnotherBranch, setInAnotherBranch] = useState(false);
    const inAnotherBranchClassName = inAnotherBranch ? 'me-4' : 'visually-hidden';
    const check = function () {
        setInAnotherBranch(!inAnotherBranch);
    }

    const [branchId, setBranchId] = useState(1);
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [cars, setCars] = useState([]);
    /*     const carsList = cars.map((car) => {
            return (
                car = car.id
            )
        })
    
        useEffect(() => {
            fetch(`http://localhost:5218/api/Car/branch/${branchId}`)
                .then(res => res.json())
                .then(data => setCars(data))
        }, [branchId, initialDate, finalDate]); */







    return (
        <form onSubmit={() => (alert())}>
            <h1 className="mb-4 text-center">Alquiler de coches</h1>
            <div className="d-flex align-items-center justify-content-center">
                <div className="me-4">
                    <label>Sucursal de recogida</label><br />
                    <select className="form-select" aria-label="" id="branchId">
                        {branchesList}
                    </select>
                </div>

                <div className={inAnotherBranchClassName}>
                    <label>Sucursal de devolución</label><br />
                    <select className="form-select" aria-label="">
                        {branchesList}
                    </select>
                </div>

                <div className="me-4">
                    <label>Día de recogida</label><br />
                    <input type="date" className="form-control" onChange={(event) => { setInitialDate(event.target.value) }} />
                </div>

                <div className="me-4">
                    <label>Día de devolución</label><br />
                    <input type="date" className="form-control" onChange={(event) => { setFinalDate(event.target.value) }} />
                </div>
            </div>
            <br />
            <div>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="me-4">
                        <label>Edad del conductor</label><br />
                        <select className="form-select" aria-label="" name="age">
                            <option value="1">19-24</option>
                            <option value="2">25-75</option>
                            <option value="3">75+</option>
                        </select>
                    </div>
                    <div className="form-check me-4">
                        <input className="form-check-input" type="checkbox" value="returnInAnotherBranchCheck" onChange={check} id="returnInAnotherBranchCheck" />
                        <label className="form-check-label">
                            Devolver el vehículo en otra oficina
                        </label>
                    </div>
                    <input type="submit" className="btn btn-warning" value="Buscar"></input>
                </div>
            </div>
        </form>
    )

}