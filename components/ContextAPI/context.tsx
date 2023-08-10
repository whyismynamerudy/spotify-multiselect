import { createContext, useContext } from 'react';

interface ContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  
    expire: number;
    setExpire: React.Dispatch<React.SetStateAction<number>>;
  
    storedAt: number;
    setStoredAt: React.Dispatch<React.SetStateAction<number>>;

    refresh: string | null;
    setRefresh: React.Dispatch<React.SetStateAction<string | null>>;
}

const appContext = createContext<ContextType | undefined>(undefined);

export default function AppContext(): ContextType {
    const context = useContext(appContext);
    
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return context;
}