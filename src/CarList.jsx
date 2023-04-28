
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
                    <img src={`src/assets/${item.model}.webp`} className='card-img-top mb-2' style={{ width: '250px', height: '150px' }}></img>
                    <h5 className="card-title">{item.brand} {item.model}</h5>
                    <div className='card-text mb-2 d-flex'>
                        <h5><div className="badge text-bg-secondary me-3"><img src='src/assets/gear.svg' width={'15px'}></img> {item.isAutomatic ? 'Automático' : 'Manual'}</div></h5>
                        <h5><div className="badge text-bg-secondary"><i className="bi bi-fuel-pump-fill"></i>&nbsp;{item.isGasoline ? 'Gasolina' : 'Diésel'}</div></h5>
                    </div>
                    <a onClick={e => handleA(e)} className={carSelected == item.id ? 'btn btn-primary' : 'btn btn-warning'} id={item.id}>{carSelected == item.id ? 'Seleccionado' : 'Seleccionar'}</a>
                </div>
            </div>

        )
    })



    return (
        <div>
            <div className="d-flex flex-wrap">
                {carsList.length == 0 ? 'No hay coches disponibles' : carsList}
            </div>

        </div>
    )
}