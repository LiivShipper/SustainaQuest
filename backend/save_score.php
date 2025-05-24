<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'sustainaquest_db';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit;
}

$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;

if ($user_id <= 0 || $score < 0) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

// Usar el nombre correcto de la columna: pontuacao
$sql = "INSERT INTO scores (user_id, pontuacao) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE pontuacao = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta']);
    exit;
}

$stmt->bind_param("iii", $user_id, $score, $score);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Puntuación total guardada con éxito']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar la puntuación']);
}

$stmt->close();
$conn->close();

