import NavAdmin from "../NavAdmin";
import LoginAdmin from "../adminPages/LoginAdmin";
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
        sessionStorage.setItem('section', section);
    }
    let logged = false;
    if (sessionStorage.getItem('adminToken')) {
        let token = JSON.parse(atob(sessionStorage.getItem("adminToken").split('.')[1]))
        logged = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'admin';
    }


    if (logged) {
        return ( //cambiar a conditional rendering
            <div>
                <NavAdmin changeSection={handleSection} />

                <div className="container pt-3">
                    <section className={sessionStorage.getItem('section') == 'categorias' ? '' : 'visually-hidden'}>
                        <Categories />
                    </section>

                    <section className={sessionStorage.getItem('section') == 'clientes' ? '' : 'visually-hidden'}>
                        <Customers />
                    </section>

                    <section className={sessionStorage.getItem('section') == 'coches' ? '' : 'visually-hidden'}>
                        <Cars />
                    </section>

                    <section className={sessionStorage.getItem('section') == 'reservas' ? '' : 'visually-hidden'}>
                        <Reservations />
                    </section>

                    <section className={sessionStorage.getItem('section') == 'sucursales' ? '' : 'visually-hidden'}>
                        <Branches />
                    </section>
                </div>
            </div>
        )
    } else {
        return (
            <LoginAdmin></LoginAdmin>
        )
    }



}