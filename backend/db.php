<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "sustainaquest_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>
