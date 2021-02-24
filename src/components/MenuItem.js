import React, { useState } from "react";
import { deleteAsyncSubmenu, getAsyncSubmenu, updateAsyncMenu } from "../services/menuServices";
import SubmenuItem from "./SubmenuItem";

const MenuItem = ({ id, title, withSubmenu = false, updateMenuItem }) => {
    const [submenu, setSubmenu] = useState([]);
    const [loading, setLoading] = useState(false);

    function loadSubmenu() {
        setLoading(true);
        setSubmenu([]);
        getAsyncSubmenu(id).then(submenu => {
            setLoading(false);
            setSubmenu(submenu);
        });
    }

    async function deleteSubmenu(submenuId, menuId) {
        const newSubmenu = submenu.filter(s => s.id !== submenuId);

        await deleteAsyncSubmenu(submenuId, true);
        
        if (newSubmenu.length === 0) {
            await updateAsyncMenu(menuId, {withSubmenu: false});            
        }

        setSubmenu(newSubmenu);
        if (newSubmenu.length === 0) {
            updateMenuItem(menuId, {withSubmenu: false});
        };
    }    


    return (
        <li className="menu__item">
            <a className="menu__link" href="/">{title}</a>
            {withSubmenu ?
                loading ? "loading..." :
                    <button onClick={loadSubmenu}>Load Submenu</button>
                : null
            }
            {
                submenu.length ? (<>
                    <button type="button" className="menu__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 10" width="18" height="10">
                            <path d="M9 10a.997.997 0 01-.707-.293l-8-8A1 1 0 011.707.293L9 7.586 16.293.293a1 1 0 011.414 1.414l-8 8A.997.997 0 019 10z" fill="currentColor"></path>
                        </svg>
                    </button>
                    <ul className="submenu">
                        {
                            submenu.map((submenuItem) => <SubmenuItem key={submenuItem.id} deleteSubmenu={() => deleteSubmenu(submenuItem.id, id)} {...submenuItem}/>)
                        }
                    </ul>
                </>)
                    : null
            }
        </li>
    )
}

export default MenuItem