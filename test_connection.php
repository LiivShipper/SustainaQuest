<?php

$host = "localhost";
$user = "root";
$password = "";  
$dbname = "sustainaquest_db";


$conn = new mysqli($host, $user, $password, $dbname);


if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos!";
}

$conn->close();
?>
