import { useEffect, useState } from "react"
import BranchesAdd from "./BranchesAdd";
import BranchesUpdate from "./BranchesUpdate";


export default function Branches() {
    useEffect(() => {
        fetch(`http://localhost:5218/api/Branch/`)
            .then(res => res.json())
            .then(data => {
                setBranches(data);
            })
    }, [])

    const [branches, setBranches] = useState([]);
    const [branchSelected, setBranchSelected] = useState(null);
    console.log(branchSelected)

    function selectBranch(e) {
        if (branchSelected == e.target.id) {
            setBranchSelected(null)
        } else {
            setBranchSelected(e.target.id)
        }
    }

    function deleteBranch(e) {
        if (confirm('Seguro que desea eliminar la sucursal?')) {
            fetch(`http://localhost:5218/api/Branch/${e.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
            alert('Sucursal eliminada correctamente');
            window.location.reload();
        }
    }


    const branchesList = branches.map((branch) => {
        return (
            <div key={branch.id} className={branch.id == branchSelected ? 'card me-3 border border-primary' : 'card me-3'}>
                <div className="card-body">
                    <h4 className="card-title" id={branch.name}>{branch.name}</h4>
                    <div className="card-text">Localización: <span id={branch.location}>{branch.location}</span></div>
                    <button className={branch.id == branchSelected ? "btn btn-primary mt-2 me-2" : "btn btn-warning mt-2 me-2"} id={branch.id} onClick={(e) => selectBranch(e)}>{branch.id == branchSelected ? 'Editando...' : 'Editar'}</button>
                    <button className="btn btn-danger mt-2" id={branch.id} onClick={(e) => deleteBranch(e)}>Eliminar</button>
                </div>
            </div>
        )
    })




    return (
        <div>
            <section className="mb-5">
                <h3>Sucursales</h3>
                <div className="d-flex flex-wrap">{branchesList}</div>
            </section>
            <section className="mb-4">
                <BranchesAdd></BranchesAdd>
            </section>
            <section>
                <BranchesUpdate branchSelected={branchSelected}></BranchesUpdate>
            </section>

        </div>
    )
}