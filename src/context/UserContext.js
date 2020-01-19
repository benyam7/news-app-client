import { createContext } from 'react'

const UserContext = createContext(
    {
        user: null,
        login: (userData) => {},
        logout: () => {}
    }
)

export { UserContext}