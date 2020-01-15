import { createContext } from 'react'
// User context

const UserContext = createContext(
    {
        user: null,
        login: (userData) => {},
        logout: () => {}
    }
)

export { UserContext}