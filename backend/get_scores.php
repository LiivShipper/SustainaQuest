<?php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo "Método não permitido";
    exit;
}

if (!isset($_GET['user_id'])) {
    http_response_code(400);
    echo "Falta o parâmetro user_id";
    exit;
}

$user_id = intval($_GET['user_id']);

$stmt = $conn->prepare("SELECT score, created_at FROM scores WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $scores = [];

    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($scores);
} else {
    http_response_code(500);
    echo "Erro ao buscar pontuações";
}

$conn->close();
