import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.main}>
      <h1>Bienvenido</h1>
      <p>¿Qué desea hacer hoy?: acceder, registrar o ver turnos.</p>
    </div>
  );
}