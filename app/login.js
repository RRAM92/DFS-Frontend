import {useState} from "react";
import Navbar from "../components/Navbar";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    async function gestionarLogin(e){
        e.preventDefault();
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });
            if(!res.ok) throw new Error("INVÁLIDO");
            
            const data = await res.json();
            localStorage.setItem("token", data.token);
            setError(null);
            window.location.href = "/turnos";
            
        } catch(err){setError(err.message);}
    }
    
    return(
        <div>
            <Navbar />
            <h1>Login</h1>
            <form onSubmit={gestionarLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    );
}