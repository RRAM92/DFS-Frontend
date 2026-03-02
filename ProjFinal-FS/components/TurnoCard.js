export default function TurnoCard({turno}){
    return(
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px"
            }}
        >
            <h3>{turno.nombreCliente}</h3>
            <p>Servicio: {turno.servicio}</p>
            <p>Estado: {turno.status}</p>
            <p>Hora: {turno.horaLlegada}</p>
        </div>
    );
}