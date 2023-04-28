
import { useState } from 'react';




export default function CarList(props) {

    const [carSelected, setCarSelected] = useState(0);
    const handleA = (e) => {
        setCarSelected(e.target.id);
    }
    sessionStorage.setItem('carSelected', carSelected);

    let listToConvertToHtml = props.cars;




    let carsList = listToConvertToHtml.map((item) => {

        const bookingData = sessionStorage.getItem('bookingData');
        const bookingDataJSON = JSON.parse(bookingData);
        const initialMonth = new Date(bookingDataJSON[2]).getMonth() + 1;
        const finalMonth = new Date(bookingDataJSON[3]).getMonth() + 1;

        let price = item.price * sessionStorage.getItem('days');
        let increase = false;

        if (initialMonth >= 6 && initialMonth <= 8) increase = true;
        if (finalMonth >= 6 && finalMonth <= 8) increase = true;
        if (initialMonth <= 6 && finalMonth >= 8) increase = true;

        if (increase) price *= 1.2

        if (props.isInternational) price += 100;
        if (props.hasGps) price += 30;
        if (props.numberOfDrivers == 2) price += 50;
        if (props.numberOfDrivers == 3) price += 70;



        return (
            <div className="card me-2" key={item.id}>

                <div className="card-body">
                    <img src={`src/assets/${item.model}.webp`} className='card-img-top mb-2' style={{ width: '250px', height: '150px' }}></img>
                    <h5 className="card-title">{item.brand} {item.model}</h5>
                    <div className='card-text mb-2 d-flex'>
                        <h5><div className="badge text-bg-secondary me-3"><img src='src/assets/gear.svg' width={'15px'}></img> {item.isAutomatic ? 'Automático' : 'Manual'}</div></h5>
                        <h5><div className="badge text-bg-secondary"><i className="bi bi-fuel-pump-fill"></i>&nbsp;{item.isGasoline ? 'Gasolina' : 'Diésel'}</div></h5>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <a onClick={e => handleA(e)} className={carSelected == item.id ? 'btn btn-primary' : 'btn btn-warning'} id={item.id}>{carSelected == item.id ? 'Seleccionado' : 'Seleccionar'}</a>
                        <div>{price}€</div>
                    </div>

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