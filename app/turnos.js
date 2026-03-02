import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import TurnoCard from "../components/TurnoCard";

export default function Turnos(){
    const [turnos, setTurnos] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchTurnos(){
            try{
                const token = localStorage.getItem("token");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/turnos`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                if(!res.ok) throw new Error("NO AUTORIZADO");
                const data = await res.json();
                setTurnos(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchTurnos();
    }, []);
    
    return(
        <div>
            <Navbar />
            <h1>Lista de Turnos</h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            {turnos.map((t) => (
                <TurnoCard key={t.id} turno={t} />
            ))}
        </div>
    );
}