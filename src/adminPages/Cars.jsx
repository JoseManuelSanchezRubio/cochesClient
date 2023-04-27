import { useEffect, useState } from "react";
import CarsUpdate from "./CarsUpdate";
import { CarsAdd } from "./CarsAdd";



export default function Cars() {
    useEffect(() => {
        fetch(`http://localhost:5218/api/Car/`)
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setCarsList(refreshTable(data));
            })
    }, [])



    const [cars, setCars] = useState([])
    const [carsList, setCarsList] = useState([]);
    const [updateSelectedCar, setUpdateSelectedCar] = useState();


    function sortBy() {

        setCarsList(refreshTable(cars.sort(compare)));
    }
    function sortByDesc() {

        setCarsList(refreshTable(cars.sort(compareDesc)));
    }
    function compare(a, b) {
        if (a.brand < b.brand) {
            return -1;
        }
        if (a.brand > b.brand) {
            return 1;
        }
        return 0;
    }
    function compareDesc(b, a) {
        if (a.brand < b.brand) {
            return -1;
        }
        if (a.brand > b.brand) {
            return 1;
        }
        return 0;
    }

    function deleteCar(e) {
        if (confirm('Seguro que desea eliminar el coche?')) {
            fetch(`http://localhost:5218/api/Car/${e.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
            alert('Coche eliminado correctamente');
            window.location.reload();
        }
    }


    function refreshTable(list) {
        let table = list.map(item => {
            return (
                <tbody key={item.id}>
                    <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.brand}</td>
                        <td>{item.model}</td>
                        <td>{item.branchId}</td>
                        <td>{item.isAutomatic ? 'Automático' : 'Manual'}</td>
                        <td>{item.isGasoline ? 'Gasolina' : 'Diésel'}</td>
                        <td>{item.typeCarId}</td>
                        <td><button className="btn btn-warning" id={item.id} onClick={(e) => setUpdateSelectedCar(e.target.id)}>Editar</button></td>
                        <td><button className="btn btn-danger" id={item.id} onClick={(e) => deleteCar(e)}>Eliminar</button></td>
                    </tr>
                </tbody>
            )
        })
        return table;
    }

    return (
        <div>
            <h3 className="mb-3">Coches</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" id="brand">
                            Marca
                            <span onClick={(e) => sortBy(e.target.id)} style={{ cursor: 'pointer' }}> ⬆</span>
                            <span onClick={(e) => sortByDesc(e.target.id)} style={{ cursor: 'pointer' }}> ⬇</span>
                        </th>
                        <th scope="col" id="model" onClick={(e) => sortBy(e.target.id)}>Modelo</th>
                        <th scope="col" id="branch" onClick={(e) => sortBy(e.target.id)}>Sucursal</th>
                        <th scope="col">Tipo de cambio</th>
                        <th scope="col">Tipo de combustible</th>
                        <th scope="col">Categoría</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {carsList}
            </table>
            <section>
                <CarsAdd></CarsAdd>
            </section>
            <section className={updateSelectedCar != null ? '' : 'visually-hidden'}>
                <CarsUpdate updateSelectedCar={updateSelectedCar} cars={cars} ></CarsUpdate>
            </section>

        </div>
    )
}