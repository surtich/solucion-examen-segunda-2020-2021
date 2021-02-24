import React, { useState } from "react";
import { getAsyncMenu } from "../services/menuServices";
import MenuItem from "./MenuItem";

function Menu() {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(false)
    function loadMenu() {
        setMenu([]);
        setLoading(true);
        getAsyncMenu().then(menu => {
            setLoading(false);
            setMenu(menu);
        });
    }

    function updateMenuItem(id, menuItem) {
        setMenu(menu.map(m => m.id === id ? ({...m, ...menuItem}) : m));
    }

    return (
        <>
            <ul className="menu">
                {
                    menu.map(menuItem => <MenuItem key={menuItem.id} id={menuItem.id} title={menuItem.title} withSubmenu={menuItem.withSubmenu} updateMenuItem={updateMenuItem} />)
                }
            </ul>
            {
                loading ? "loading..." :
                    <button onClick={loadMenu}>Load Menu</button>

            }
        </>
    )

}

export default Menu;