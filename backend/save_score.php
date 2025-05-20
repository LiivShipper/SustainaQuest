<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST["user_id"] ?? '';
    $pontuacao = $_POST["score"] ?? '';
    $energia = $_POST["energia"] ?? '';

    if (!empty($user_id) && !empty($pontuacao)) {
        if (!empty($energia)) {
            $energia = (string)$energia;  
            $stmt = $conn->prepare("INSERT INTO scores (user_id, energia, pontuacao) VALUES (?, ?, ?)");
            $stmt->bind_param("isi", $user_id, $energia, $pontuacao);
        } else {
            $stmt = $conn->prepare("INSERT INTO scores (user_id, pontuacao) VALUES (?, ?)");
            $stmt->bind_param("ii", $user_id, $pontuacao);
        }

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Puntuación guardada con éxito."]);
        } else {
            
            echo json_encode(["success" => false, "message" => "Error guardando puntuación: " . $stmt->error]);
        }

        $stmt->close();
