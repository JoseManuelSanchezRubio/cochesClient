import { useState } from "react";
import { getBranches } from '../endpoints';
import { redirect } from "react-router-dom";
import { useLoaderData, Form } from "react-router-dom";
import Nav from "../Nav";
import '../MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



export async function action() {

    let branchId = document.getElementById('branchId').value;
    let returnBranchId = document.getElementById('returnBranchId').value;
    let initialDate = document.getElementById('initialDate').value;
    let finalDate = document.getElementById('finalDate').value;
    let age = document.getElementById('age').value;
    let inAnotherBranch = document.getElementById('returnInAnotherBranchCheck').checked;


    if (initialDate == '' || finalDate == '') {
        alert("Rellena todos los campos");
        return null;
    }

    const bookingData = [branchId, returnBranchId, initialDate, finalDate, age, inAnotherBranch];
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));


    return redirect("/booking");
}

export async function loader() {
    const branches = await getBranches();
    return { branches };
}

export default function MainPage() {




    const { branches } = useLoaderData();


    const branchesList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id}>
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

    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;

    return (
        <div>
            <Nav isLogged={isLogged} />
            <Form method="post" className="p-5">
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
                        <select className="form-select" aria-label="" id="returnBranchId">
                            {branchesList}
                        </select>
                    </div>

                    <div className="me-4">
                        <label>Día de recogida</label><br />
                        <input type="date" id="initialDate" className="form-control" />
                    </div>

                    <div className="me-4">
                        <label>Día de devolución</label><br />
                        <input type="date" id="finalDate" className="form-control" />
                    </div>
                </div>
                <br />
                <div>
                    <div className="d-flex align-items-center">
                        <div className="me-4">
                            <label>Edad del conductor</label><br />
                            <select className="form-select" aria-label="" id="age">
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
            </Form>
        </div>
    )

}