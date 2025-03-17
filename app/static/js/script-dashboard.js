$(document).ready(function(){
    // Esconde o preloader
    $("#preloader").fadeOut("slow", function () {
        // Exibe o conteúdo após o preloader sumir
        $("main").fadeIn("slow");
    });
});