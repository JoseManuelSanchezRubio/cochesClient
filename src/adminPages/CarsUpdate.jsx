import { useState, useEffect } from "react";

export default function CarsUpdate({ updateSelectedCar, cars }) {

    useEffect(() => {
        fetch(`http://localhost:5218/api/Branch`)
            .then(res => res.json())
            .then(data => {
                setBranches(data);
            })
    }, [])


    const [branches, setBranches] = useState([])
    const [branch, setBranch] = useState(1)

    const branchesList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id}>
                {branch.name}
            </option>
        )
    })

    function saveChanges(e) {
        e.preventDefault();
        let typeCar;
        cars.forEach(car => {
            if (car.id == updateSelectedCar) {
                typeCar = car.typeCarId;
            }
        })
        //console.log(typeCar)
        fetch(`http://localhost:5218/api/Car/${updateSelectedCar}`, {
            method: 'PUT',
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
        alert('Coche actualizado correctamente')
        window.location.reload()

    }

    return (
        <div>
            <h3>Editar coche {updateSelectedCar}</h3>
            <form>
                <div className="">
                    <label htmlFor="branch">Sucursal</label>
                    <select className="form-select" onChange={(e) => setBranch(e.target.value)}>
                        {branchesList}
                    </select>
                </div>
                <button type="submit" className="btn btn-warning mt-3" onClick={(e) => saveChanges(e)}>Guardar</button>
            </form>
        </div>
    )
}