import Link from "next/link";

export default function Navbar(){
    return(
        <nav>
            <Link href="/">Inicio</Link>
            <Link href="/login">Login</Link>
            <Link href="/turnos">Turnos</Link>
            <Link href="/clima">Clima</Link>
        </nav>
    );
}