const API_ENDPOINT = 'http://localhost:3001';

const delay = 500;

const delayPromise = (milliseconds) => data => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data)
    }, milliseconds);
});

export const getAsyncMenu = () => fetch(API_ENDPOINT + "/menu")
    .then(response => response.json()).then(delayPromise(delay));

export const getAsyncSubmenu = (menuId) => fetch(API_ENDPOINT + "/menu/" + menuId + "?_embed=submenu")
    .then(response => response.json()).then(menu => menu.submenu).then(delayPromise(delay));

export const deleteAsyncSubmenu = (submenuId, forceError=false) => forceError ? 
                                                delayPromise(delay)().then(() => Promise.reject()) :
                                                fetch(API_ENDPOINT + "/submenu/" + submenuId, { method: "DELETE"}).then(delayPromise(delay));

export const updateAsyncMenu = (menuId, {withSubmenu}) => fetch(API_ENDPOINT + "/menu/" + menuId, {
                                                                                                    method: "PATCH",
                                                                                                    body: JSON.stringify({withSubmenu}),
                                                                                                    headers: {
                                                                                                        "Content-Type": "application/json"
                                                                                                    }
                                                                                                },
                                                                                        ).then(delayPromise(delay));