import React, { useState } from "react";

const SubmenuItem = ({ id, title, deleteSubmenu }) => {
    const [deleting, setDeleting] = useState("");

    function handleDeleteSubmenu(subMenuId) {
        setDeleting("deleting");
        deleteSubmenu(subMenuId).catch(() => setDeleting("error"));
    }    

    return (
        <li className="submenu__item" key={id} >
            <a className="submenu__link" href="/">{title}</a>
            {deleting ? deleting : <button onClick={handleDeleteSubmenu}>Delete Submenu</button>}
        </li>
    )
}

export default SubmenuItem