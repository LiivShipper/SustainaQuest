<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sustainaquest_db";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]));
}


$data = json_decode(file_get_contents('php://input'), true);


if (
    isset($data['compreension']) &&
    isset($data['experiencia']) &&
    isset($data['qualidade']) &&
    isset($data['visual']) &&
    isset($data['recomendaria'])
) {
    
    $compreension = $conn->real_escape_string($data['compreension']);
    $experiencia = $conn->real_escape_string($data['experiencia']);
    $qualidade = $conn->real_escape_string($data['qualidade']);
    $visual = $conn->real_escape_string($data['visual']);
    $recomendaria = $conn->real_escape_string($data['recomendaria']);

    
    $sql = "INSERT INTO feedback_form (compreension, experiencia, qualidade, visual, recomendaria)
            VALUES ('$compreension', '$experiencia', '$qualidade', '$visual', '$recomendaria')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Feedback guardado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan respuestas en el formulario']);
}

$conn->close();
?>
