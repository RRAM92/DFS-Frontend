import {useState} from "react";
import {apiFetch} from "../lib/api";
import Navbar from "../components/Navbar";

export default function Clima(){
    const [ciudad, setCiudad] = useState("Chihuahua");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    async function consultar(){
        try{
            const result = await apiFetch(`/clima?ciudad=${ciudad}`);
            setData(result);
            setError(null);
        }
        catch(err){setError(err.message);}
    }
    
    return(
        <div>
            <Navbar />
            <h1>Consulta de Clima</h1>
            <input
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                placeholder="Coudad"
            />
            <button onClick={consultar}>CONSULTAR</button>
            
            {error && <p style={{color:"red"}}>{error}</p>}
            {data && (
                <div>
                    <p>Ciudad: {data.ciudad}</p>
                    <p>Temperatura: {data.temperatura}°C</p>
                    <p>Descripción: {data.descripcion}</p>
                </div>
            )}
        </div>
    );
}