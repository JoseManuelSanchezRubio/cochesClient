import { useEffect, useState } from "react"


export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [nameUpdate, setNameUpdate] = useState("");
    const [nameCreate, setNameCreate] = useState('');
    const [brandUpdate, setBrandUpdate] = useState("");
    const [brandCreate, setBrandCreate] = useState('');
    const [modelUpdate, setModelUpdate] = useState("");
    const [modelCreate, setModelCreate] = useState('');
    const [isAutomaticUpdate, setIsAutomaticUpdate] = useState("1");
    const [isAutomaticCreate, setIsAutomaticCreate] = useState('1');
    const [isGasolineUpdate, setIsGasolineUpdate] = useState("1");
    const [isGasolineCreate, setIsGasolineCreate] = useState('1');

    //esto es para cargar la lista de categorias cuando updateas una categoría
    const [changesOk, setChangesOk] = useState(false);

    const categoriesList = categories.map((category) => {
        return (
            <div className={selectedCategory != category.id ? "card me-2" : "card me-2 border border-primary"} key={category.id}>

                <div className="card-body">
                    <img src={`src/assets/${category.model}.webp`} className='card-img-top mb-2' style={{ width: '250px', height: '150px' }}></img>
                    <h4 className="card-title">Categoría {category.name}</h4>
                    <h5 className="card-title">{category.brand} {category.model}</h5>
                    <div className='card-text mb-2 d-flex'>
                        <h5><div className="badge text-bg-secondary me-3"><img src='src/assets/gear.svg' width={'15px'}></img> {category.isAutomatic ? 'Automático' : 'Manual'}</div></h5>
                        <h5><div className="badge text-bg-secondary"><i className="bi bi-fuel-pump-fill"></i>&nbsp;{category.isGasoline ? 'Gasolina' : 'Diésel'}</div></h5>
                    </div>
                    <button id={category.id} className={selectedCategory == category.id ? "btn btn-primary me-2" : "btn btn-warning me-2"} onClick={(e) => handleCategory(e)}>
                        {selectedCategory == category.id ? 'Editando...' : 'Editar'}
                    </button>

                </div>
            </div>
        )
    })

    useEffect(() => {
        fetch(`http://localhost:5218/api/TypeCar/`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [changesOk])

    function handleCategory(e) {

        if (e.target.id == selectedCategory) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(e.target.id)
        }
    }

    function updateCategory(e) {
        e.preventDefault();

        let isAutomaticBoolean = true;
        let isGasolineBoolean = true;
        if (isAutomaticUpdate == '2') isAutomaticBoolean = false;
        if (isGasolineUpdate == '2') isGasolineBoolean = false;

        if (selectedCategory != null) {
            fetch(`http://localhost:5218/api/TypeCar/${selectedCategory}`, {
                method: 'PUT',
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameUpdate,
                    brand: brandUpdate,
                    model: modelUpdate,
                    isAutomatic: isAutomaticBoolean,
                    isGasoline: isGasolineBoolean
                })
            })
                .then(res => res.json())
                .then(res => console.log(res))
            alert('Categoría actualizada con éxito')
            setChangesOk(true);
        } else {
            alert('Seleccione una categoría');
        }
    }

    function createCategory(e) {
        e.preventDefault();

        let isAutomaticBoolean = true;
        let isGasolineBoolean = true;
        if (isAutomaticCreate == '2') isAutomaticBoolean = false;
        if (isGasolineCreate == '2') isGasolineBoolean = false;

        if (nameCreate != null && brandCreate != null && modelCreate != null) {
            fetch(`http://localhost:5218/api/TypeCar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameCreate,
                    brand: brandCreate,
                    model: modelCreate,
                    isAutomatic: isAutomaticBoolean,
                    isGasoline: isGasolineBoolean
                })
            })
                .then(res => res.json())
                .then(res => console.log(res))
            alert('Categoría actualizada con éxito')
            setChangesOk(true);
        } else {
            alert('Debe rellenar todos los campos');
        }
    }


    return (
        <div>
            <section>
                <h3 className="mb-3">Categorías</h3>
                <div className="d-flex flex-wrap">{categoriesList}</div>
                <h3 className="mt-3">Crear categoría</h3>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="name" placeholder="Nombre" onChange={(e) => setNameCreate(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="brand">Marca</label>
                        <input type="text" className="form-control" id="brand" placeholder="Marca" onChange={(e) => setBrandCreate(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="model">Modelo</label>
                        <input type="text" className="form-control" id="model" placeholder="Modelo" onChange={(e) => setModelCreate(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="isAutomatic">Tipo de cambio</label>
                        <select className="form-select" onChange={(e) => setIsAutomaticCreate(e.target.value)}>
                            <option value="1">Automático</option>
                            <option value="2">Manual</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isGasoline">Tipo de combustible</label>
                        <select className="form-select" onChange={(e) => setIsGasolineCreate(e.target.value)}>
                            <option value="1">Gasolina</option>
                            <option value="2">Diésel</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-warning mb-2" onClick={(e) => createCategory(e)}>Guardar</button>
                </form>
                <h3 className="mt-3">Editar categoría:</h3>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="name" placeholder="Nombre" onChange={(e) => setNameUpdate(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="brand">Marca</label>
                        <input type="text" className="form-control" id="brand" placeholder="Marca" onChange={(e) => setBrandUpdate(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="model">Modelo</label>
                        <input type="text" className="form-control" id="model" placeholder="Modelo" onChange={(e) => setModelUpdate(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="isAutomatic">Tipo de cambio</label>
                        <select className="form-select" onChange={(e) => setIsAutomaticUpdate(e.target.value)}>
                            <option value="1">Automático</option>
                            <option value="2">Manual</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isGasoline">Tipo de combustible</label>
                        <select className="form-select" onChange={(e) => setIsGasolineUpdate(e.target.value)}>
                            <option value="1">Gasolina</option>
                            <option value="2">Diésel</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-warning mb-2" onClick={(e) => updateCategory(e)}>Guardar</button>
                </form>
            </section>
        </div>
    )
}