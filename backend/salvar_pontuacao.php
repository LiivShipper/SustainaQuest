<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$usuario = 'root';
$senha = '';
$database = 'sustainaquest_db';
$host = 'localhost';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['usuario']) || !isset($data['pontuacoes']) || !isset($data['pontuacao_total'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$usuario_nombre = $data['usuario'];
$pontuacoes = $data['pontuacoes'];
$pontuacao_total = (int)$data['pontuacao_total'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // obter usuario
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE nombre = :nombre");
    $stmt->execute(['nombre' => $usuario_nombre]);
    $usuario_db = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario_db) {
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre) VALUES (:nombre)");
        $stmt->execute(['nombre' => $usuario_nombre]);
        $usuario_id = $pdo->lastInsertId();
    } else {
        $usuario_id = $usuario_db['id'];
    }

    // por energia
    $stmt = $pdo->prepare(
        "INSERT INTO pontuacoes (usuario_id, energia, pontuacao) VALUES (:usuario_id, :energia, :pontuacao)
        ON DUPLICATE KEY UPDATE pontuacao = :pontuacao"
    );

    foreach ($pontuacoes as $energia => $pontuacao) {
        $stmt->execute([
            'usuario_id' => $usuario_id,
            'energia' => $energia,
            'pontuacao' => (int)$pontuacao,
        ]);
    }

    //total
    $stmt = $pdo->prepare(
        "INSERT INTO pontuacao_total (usuario_id, pontuacao_total) VALUES (:usuario_id, :pontuacao_total)
         ON DUPLICATE KEY UPDATE pontuacao_total = :pontuacao_total"
    );
    $stmt->execute([
        'usuario_id' => $usuario_id,
        'pontuacao_total' => $pontuacao_total,
    ]);

    echo json_encode(['success' => true, 'message' => 'Puntajes guardados correctamente']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
