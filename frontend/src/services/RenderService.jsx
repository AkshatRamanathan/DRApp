import { useEffect, useState } from "react"
import { DesignContext } from "./Contexts";


export default function RenderService({ children }) {

    const [path, setPath] = useState(window.location.pathname);
    const [design, setDesign] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api${path}`);
            const pageJSON = await response.json();
            setDesign(pageJSON.renderList ? pageJSON.renderList : {});
            setData(pageJSON.data ? pageJSON.data : {});
        }
        fetchData();
    }, [path]);


    return (
        <DesignContext.Provider value={{ design, data }}>
            <br />
            <div className="d-flex justify-content-center">
                {children}
            </div>
        </DesignContext.Provider>
    )
}
