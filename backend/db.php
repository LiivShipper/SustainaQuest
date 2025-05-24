<?php
$servername = "localhost";
$username = "root";
$password = ""; // o la contraseña que uses
$database = "sustainaquest_db";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
