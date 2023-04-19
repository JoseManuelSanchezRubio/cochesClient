import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export function ReservationCard() {
    const [inAnotherBranch, setInAnotherBranch] = useState(false);
    const inAnotherBranchclassName = inAnotherBranch ? 'me-4' : 'visually-hidden';
    const check = () => {
        setInAnotherBranch(!inAnotherBranch);
    }
    return (
        <div>
            <h1 className="mb-4">Alquiler de coches</h1>
            <div className="d-flex align-items-center">
                <div className="me-4">
                    <label>Sucursal de recogida</label><br />
                    <input type="text" className="form-control" name="branchId" />
                </div>

                <div className={inAnotherBranchclassName}>
                    <label>Sucursal de devolución</label><br />
                    <input type="text" className="form-control" name="returnBranchId" />
                </div>

                <div className="me-4">
                    <label>Día de recogida</label><br />
                    <input type="date" className="form-control" name="initialDate" />
                </div>

                <div className="me-4">
                    <label>Día de devolución</label><br />
                    <input type="date" className="form-control" name="finalDate" />
                </div>
            </div>

            <br />

            <div>
                <div className="d-flex align-items-center">
                    <div className="me-4">
                        <label>Edad del conductor</label><br />
                        <select className="form-select" aria-label="Default select example" name="age">
                            <option value="1">19-24</option>
                            <option value="2">25-75</option>
                            <option value="3">75+</option>
                        </select>
                    </div>
                    <div className="form-check me-4">
                        <input className="form-check-input" type="checkbox" value="returnInAnotherBranchCheck" onChange={check} />
                        <label className="form-check-label">
                            Devolver el vehículo en otra oficina
                        </label>
                    </div>
                    <button className="btn btn-warning">Buscar</button>
                </div>
            </div>
        </div>
    )

}