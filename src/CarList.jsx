
import { useState } from 'react';




export default function CarList(props) {

    const [carSelected, setCarSelected] = useState(0);
    const handleA = (e) => {
        setCarSelected(e.target.id);
    }
    sessionStorage.setItem('carSelected', carSelected);

    let listToConvertToHtml = props.cars;




    let carsList = listToConvertToHtml.map((item) => {
        return (
            <div className="card me-2" key={item.id}>

                <div className="card-body">
                    <img src={`src/assets/${item.model}.png`} className='card-img-top mb-2'></img>
                    <h5 className="card-title">{item.brand} {item.model}</h5>
                    <div className="card-text">{item.isAutomatic ? 'Automático' : 'Manual'}</div>
                    <div className="card-text mb-2">{item.isGasoline ? 'Gasolina' : 'Diésel'}</div>
                    <a onClick={e => handleA(e)} className={carSelected == item.id ? 'btn btn-primary' : 'btn btn-warning'} id={item.id}>{carSelected == item.id ? 'Seleccionado' : 'Seleccionar'}</a>
                </div>
            </div>

        )
    })



    return (
        <div>
            <div className="d-flex flex-wrap">
                {carsList}
            </div>

        </div>
    )
}