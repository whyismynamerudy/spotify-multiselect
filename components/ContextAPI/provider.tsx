'use client'

import { useState, ReactNode, createContext, useContext } from 'react';

interface ContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  
    expire: number;
    setExpire: React.Dispatch<React.SetStateAction<number>>;
  
    storedAt: number;
    setStoredAt: React.Dispatch<React.SetStateAction<number>>;

    refresh: string | null;
    setRefresh: React.Dispatch<React.SetStateAction<string | null>>;

    test: string
}

interface AppContextProviderProps {
    children: ReactNode;
}

const appContext = createContext<ContextType | undefined>(undefined);

export function useAppContext(): ContextType {
    const context = useContext(appContext);
    
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return context;
}

export default function AppContextProvider({ children }: AppContextProviderProps) {

    const [ token, setToken ] = useState<string | null>(null)
    const [ expire, setExpire ] = useState<number>(0)
    const [ storedAt, setStoredAt ] = useState<number>(0)
    const [ refresh, setRefresh ] = useState<string | null>(null)
    const test = "hi there, context is working boss;"

    return (
        <appContext.Provider value = {{ token, setToken, expire, setExpire, storedAt, setStoredAt, refresh, setRefresh, test }}>
            { children }
        </appContext.Provider>
    )
}