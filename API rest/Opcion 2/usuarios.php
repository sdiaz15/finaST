<?php

    header("Content-Type: application/json");
    include_once("../api/class-usuario.php");
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $_POST = json_decode(file_get_contents('php://input'), true);
            $usuario = new Usuario($_POST["nombre"], $_POST["apellido"], $_POST["fechaNacimiento"], $_POST["pais"]);
            $usuario->guardarUsuario();
            $resultado["mensaje"] = "Se Guardo el Libro, informacion:". json_encode($_POST);
            echo json_encode($resultado);
        break;

        case 'GET':
            if (isset ($_GET['id'])) {
                Usuario::obtenerUsuario($_GET['id']);
            }else{
                Usuario::obtenerUsuarios();

            } 
        break;
        

    case 'PUT':
        $_PUT = json_decode(file_get_contents('php://input'), true);
        $usuario = new Usuario($_PUT['nombre'],$_PUT['apellido'],$_PUT['fechaNacimiento'],$_PUT['pais']);
        $usuario->actualizarUsario($_GET['id']);
        $resultado["mensaje"] = "Se actualizó el usuario con id: " . $_GET['id'];
                                ", Informacion a actualizar: ".json_encode($_PUT);
        echo json_encode($resultado);
    break;

    case 'DELETE':
        Usuario::eliminarUsarios($_GET["id"]);
        $resultado["mensaje"] = "Se elimino el libro con el id: ".$_GET['id'];
        echo json_encode($resultado);
    break;
}

?>
