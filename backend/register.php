<?php
// Incluir el archivo de conexión a la base de datos
include('db.php');

// Comprobar si se recibieron los datos del formulario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los valores del formulario
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Verificar si los campos no están vacíos
    if (empty($username) || empty($email) || empty($password)) {
        echo "Todos los campos son requeridos.";
    } else {
        // Encriptar la contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insertar los datos en la base de datos
        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            echo "Usuario registrado exitosamente.";
        } else {
            echo "Error al registrar el usuario: " . $conn->error;
        }
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>

<!-- Formulario HTML para el registro de usuario -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Usuario</title>
</head>
<body>
    <h2>Registro de Usuario</h2>
    <form action="register.php" method="POST">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" name="username" id="username" required><br><br>

        <label for="email">Correo Electrónico:</label>
        <input type="email" name="email" id="email" required><br><br>

        <label for="password">Contraseña:</label>
        <input type="password" name="password" id="password" required><br><br>

        <button type="submit">Registrar</button>
    </form>
</body>
</html>
