import { useState } from "react";
import { getBranches } from '../endpoints';
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import '../MainPage.css';



export async function loader() {
    const branches = await getBranches();
    return { branches };
}

export default function MainPage() {

    const { branches } = useLoaderData();


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


    return (
        <form onSubmit={() => (alert())}>
            <h1 className="mb-4">Alquiler de coches</h1>
            <div className="d-flex align-items-center">
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
                <div className="d-flex align-items-center">
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