import { useEffect, useState } from "react"


export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [isAutomatic, setIsAutomatic] = useState("1");
    const [isGasoline, setIsGasoline] = useState("1");

    //esto es para cargar la lista de categorias cuando updateas una categoría
    const [updateOk, setUpdateOk] = useState(false);

    const categoriesList = categories.map((category) => {
        return (
            <div className={selectedCategory != category.id ? "card me-2" : "card me-2 border border-primary"} key={category.id}>

                <div className="card-body">
                    <img src={`src/assets/${category.model}.png`} className='card-img-top mb-2' style={{ width: '250px', height: '150px' }}></img>
                    <h4 className="card-title">Categoría {category.name}</h4>
                    <h5 className="card-title">{category.brand} {category.model}</h5>
                    <div className="card-text">Tipo de cambio: {category.isAutomatic ? 'Automático' : 'Manual'}</div>
                    <div className="card-text mb-2">Combustible: {category.isGasoline ? 'Gasolina' : 'Diésel'}</div>
                    <button id={category.id} className={selectedCategory == category.id ? "btn btn-primary me-2" : "btn btn-warning me-2"} onClick={(e) => handleCategory(e)}>
                        {selectedCategory == category.id ? 'Editando...' : 'Editar'}
                    </button>

                </div>
            </div>
        )
    })
    //console.log(categories)
    useEffect(() => {
        fetch(`http://localhost:5218/api/TypeCar/`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [updateOk])

    function handleCategory(e) {
        /* console.log(e.target.id)
        console.log(selectedCategory) */
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
        if (isAutomatic == '2') isAutomaticBoolean = false;
        if (isGasoline == '2') isGasolineBoolean = false;

        if (selectedCategory != null) {
            fetch(`http://localhost:5218/api/TypeCar/${selectedCategory}`, {
                method: 'PUT',
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    brand: brand,
                    model: model,
                    isAutomatic: isAutomaticBoolean,
                    isGasoline: isGasolineBoolean
                })
            })
                .then(res => res.json())
                .then(res => console.log(res))
            alert('Categoría actualizada con éxito')
            setUpdateOk(true);
        } else {
            alert('Seleccione una categoría');
        }
    }


    return (
        <div>
            <section>
                <h3 className="mb-3">Categorías</h3>
                <div className="d-flex flex-wrap">{categoriesList}</div>
                <h3 className="mt-3">Editar categoría:</h3>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="name" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="brand">Marca</label>
                        <input type="text" className="form-control" id="brand" placeholder="Marca" onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="model">Modelo</label>
                        <input type="text" className="form-control" id="model" placeholder="Modelo" onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="isAutomatic">Tipo de cambio</label>
                        <select className="form-select" onChange={(e) => setIsAutomatic(e.target.value)}>
                            <option value="1">Automático</option>
                            <option value="2">Manual</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isGasoline">Tipo de combustible</label>
                        <select className="form-select" onChange={(e) => setIsGasoline(e.target.value)}>
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