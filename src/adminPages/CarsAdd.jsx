import { useState, useEffect } from "react";

export function CarsAdd({ changeBranchAdd }) {

    useEffect(() => {
        fetch(`http://localhost:5218/api/Branch`)
            .then(res => res.json())
            .then(data => {
                setBranches(data);
            })
        fetch(`http://localhost:5218/api/TypeCar/`)
            .then(res => res.json())
            .then(data => setTypeCars(data))
    }, [])

    const [branches, setBranches] = useState([])
    const [branch, setBranch] = useState(1)
    const [typeCar, setTypeCar] = useState(1)
    const [typeCars, setTypeCars] = useState([])

    const branchesList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id}>
                {branch.name}
            </option>
        )
    })
    const typeCarsList = typeCars.map((typeCar) => {
        return (
            <option key={typeCar.id} value={typeCar.id}>
                Categoría {typeCar.name}: {typeCar.brand} {typeCar.model} ({typeCar.isAutomatic ? 'automático' : 'manual'} y {typeCar.isGasoline ? 'gasolina' : 'diésel'})
            </option>
        )
    })

    function saveChanges(e) {
        e.preventDefault();
        fetch(`http://localhost:5218/api/Car`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branchId: branch,
                typeCarId: typeCar
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))

        alert('Coche agregado exitosamente');
        window.location.reload();
    }


    return (
        <div>
            <h3>Añadir coche</h3>
            <form>
                <div>
                    <label htmlFor="branch">Sucursal</label>
                    <select className="form-select" onChange={(e) => setBranch(e.target.value)}>
                        {branchesList}
                    </select>
                </div>
                <div>
                    <label htmlFor="branch">Categoría</label>
                    <select className="form-select" onChange={(e) => setTypeCar(e.target.value)}>
                        {typeCarsList}
                    </select>
                </div>
                <button type="submit" className="btn btn-warning mt-3 mb-3" onClick={(e) => saveChanges(e)}>Guardar</button>
            </form>
        </div>
    )
}