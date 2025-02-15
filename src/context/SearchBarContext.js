import { createContext, useContext, useState } from "react";

const Search = createContext()
export const useSearchContext = ()=> useContext(Search)
export default function SearchContext({children}){
    const [isOpenSearch,setIsOpenSearch] = useState(false)
    return(
        <Search.Provider value={{isOpenSearch,setIsOpenSearch}}>{children}</Search.Provider>
    )
}