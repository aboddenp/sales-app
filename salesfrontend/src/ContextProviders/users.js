import Api from "../utils/api"
import React from "react"

export const UsersContext = React.createContext(null);

export function useUsers() {
    return React.useContext(UsersContext);
}

export default function UsersProvider({ children }) {
    const [users, setUsers] = React.useState([]);

    function loadUsers(callback) {
        const api = new Api();
        api.getUsers().then((response) => {
            setUsers(response.data);
            callback();
        });
    }
    let value = { users, loadUsers };

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
}