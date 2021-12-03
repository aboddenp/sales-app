import Api from "../utils/api"
import React from "react"

export const UsersContext = React.createContext(null);

export function useUsers() {
    return React.useContext(UsersContext);
}

export default function UsersProvider({ children }) {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const api = new Api();
        api.getUsers().then((response) => {
            setUsers(response.data);
            setLoading(false)
        });
    }, []);

    let value = { users,loading};

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
}