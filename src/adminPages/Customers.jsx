import { useEffect, useState } from "react"


export default function Customers() {

    useEffect(() => {
        fetch(`http://localhost:5218/api/Customer/`)
            .then(res => res.json())
            .then(data => {
                setCustomers(data);
                setCustomersList(refreshTable(data));
            })


    }, [])


    const [customers, setCustomers] = useState([])
    const [customersList, setCustomersList] = useState([]);

    function refreshTable(list) {
        let table = list.map(item => {
            return (
                <tbody key={item.id}>
                    <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.email}</td>
                        <td>{item.age}</td>
                        {/* <td><button className="btn btn-warning">Editar</button></td>
                        <td><button className="btn btn-danger">Eliminar</button></td> */}
                    </tr>
                </tbody>
            )
        })
        return table;
    }

    function searchByName(e) {
        let filter = customers.filter(customer => {
            return customer.name.toLowerCase().includes(e.toLowerCase()) || customer.surname.toLowerCase().includes(e.toLowerCase()) || customer.email.toLowerCase().includes(e.toLowerCase())
        })
        setCustomersList(refreshTable(filter));
    }





    return (
        <div>
            <h3 className="mb-3">Clientes</h3>
            <input type="text" className="form-control mb-2" placeholder="Filtrar cliente por nombre, apellido o email" onChange={(e) => searchByName(e.target.value)}></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edad</th>
                        {/* <th scope="col"></th>
                        <th scope="col"></th> */}
                    </tr>
                </thead>
                {customersList}
            </table>

        </div>
    )
}