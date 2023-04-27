import NavAdmin from "../NavAdmin";
import Branches from "./../adminPages/Branches";
import Cars from "./../adminPages/Cars";
import Categories from "./../adminPages/Categories";
import Customers from "./../adminPages/Customers";
import Reservations from "./../adminPages/Reservations";
import { useState } from "react";




export default function Admin() {

    const [section, setSection] = useState("categorias");
    const handleSection = (section) => {
        setSection(section);
    }
    //console.log(section)
    return ( //cambiar a conditional rendering
        <div>
            <NavAdmin changeSection={handleSection} />

            <div className="container pt-3">
                <section className={section == 'categorias' ? '' : 'visually-hidden'}>
                    <Categories />
                </section>

                <section className={section == 'clientes' ? '' : 'visually-hidden'}>
                    <Customers />
                </section>

                <section className={section == 'coches' ? '' : 'visually-hidden'}>
                    <Cars />
                </section>

                <section className={section == 'reservas' ? '' : 'visually-hidden'}>
                    <Reservations />
                </section>

                <section className={section == 'sucursales' ? '' : 'visually-hidden'}>
                    <Branches />
                </section>
            </div>
        </div>
    )
}