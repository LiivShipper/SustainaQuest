<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST["user_id"];
    $score = $_POST["score"];

    if (!empty($user_id) && !empty($score)) {
        $stmt = $conn->prepare("INSERT INTO scores (user_id, score) VALUES (?, ?)");
        $stmt->bind_param("ii", $user_id, $score);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Puntaje guardado con éxito."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al guardar el puntaje."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Datos incompletos."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

$conn->close();
?>
