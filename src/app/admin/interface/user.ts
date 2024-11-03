export interface IUser {
    id?: number;       // Opcional, ya que se genera automáticamente
    nombre: string;    // Debe coincidir con lo que espera la API
    username: string;  
    correo: string;    // Debe coincidir con lo que espera la API
}
