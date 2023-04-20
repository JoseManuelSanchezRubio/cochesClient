import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function ChooseCar() {

    return (
        <div>
            <h1 className='mb-4 text-center'>Elige el coche que necesitas</h1>
            <div className="d-flex justify-content-center">
                <div className="form-floating w-25 me-2">
                    <select className="form-select" id="typeCar" aria-label="">
                        <option value="1">Automático</option>
                        <option value="2">Manual</option>
                    </select>
                    <label htmlFor="typeCar">Tipo de cambio</label>
                </div>
                <div className="form-floating w-25">
                    <select className="form-select" id="typeFuel" aria-label="">
                        <option value="1">Diésel</option>
                        <option value="2">Gasolina</option>
                    </select>
                    <label htmlFor="typeFuel">Tipo de combustible</label>
                </div>

            </div>
        </div>
    )
}