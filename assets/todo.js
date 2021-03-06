var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};



(function(todo, data, $) {

    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div",
	    libro: "libro"
        }, codes = {
            "1" : "#pending",
            "2" : "#inProgress",
            "3" : "#completed",
	    "4" : "#menu3"
        };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

    };


    // Add Task
    var generateElement = function(params){
/*	alert("add task");*/
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

	wrapper = $("<a />",{
		"id" : defaults.taskId + params.id,
		"data-id" : params.id,
		"onclick" : "todo.cambiar('"+defaults.taskId + params.id+"');"
		
	}).appendTo(parent)
	$("<img />", {
            "class" : defaults.libro,
            "src" : params.ubicacionimagen,
	    "alt" : params.title
        }).appendTo(wrapper);


    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.add = function() {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, title, description, ubicacionpdf, ubicacionimagen, tempData;

        if (inputs.length !== 6) {
            return;
        }

        title = inputs[0].value;
        description = inputs[1].value;
        ubicacionpdf = inputs[2].value;
	ubicacionimagen = inputs[3].value;

        if (!title) {
            generateDialog(errorMessage);
            return;
        }

        id = new Date().getTime();

        tempData = {
            id : id,
            code: "4",
            title: title,
            ubicacionpdf: ubicacionpdf,
            description: description,
	    ubicacionimagen: ubicacionimagen,
	    favorito: "f",
	    porleer: "f",
	    leido: "f"
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(tempData);

        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
	inputs[3].value = "";
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Messaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };

	    responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };

    todo.clear = function () {

        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

    todo.visibilidad = function (a) {
            if (a == 0)
            {
                document.getElementById("nuevoLibro").style.display = "none";
                document.getElementById("logo").style.display = "none";
                document.getElementById("cajaInput").style.display = "block";
                
            }
            else{
                document.getElementById("nuevoLibro").style.display = "block";
                document.getElementById("logo").style.display = "block";
                document.getElementById("cajaInput").style.display = "none";
                }
        };


	todo.cambiar = function(idinput){

	var idreal = document.getElementById(idinput).dataset.id;

	$("#menu").attr("data-idlibro", idreal);
	var descripcion = data[idreal].description;
	$("#textoSinopsis").html(descripcion);
	var imagen = data[idreal].ubicacionimagen;

	$("#infoImagen").attr("src", imagen);
	var titulo = data[idreal].title;

	$("#infoTitulo").html(titulo);
	var porleer = data[idreal].porleer;

	if (porleer == "t"){
		$("#infoPorLeer").prop('checked',true);
	}else{
		$("#infoPorLeer").prop('checked',false);
	}
	var leido = data[idreal].leido;

	if (leido == "t"){
		$("#infoLeido").prop('checked',true);
	}else{
		$("#infoLeido").prop('checked',false);
	}
	var favorito = data[idreal].favorito;

	if (favorito == "t" && !todo.favoritoestado){
		todo.favoritearboton();
	}else if (favorito == "f" && todo.favoritoestado){
		todo.favoritearboton();
	}
};


	todo.cambiocheckboxporleer = function (){

		var id = document.getElementById("menu").dataset.idlibro;

		var estado = data[id].porleer;

		if (estado == "t"){
		data[id].porleer = "f";
		}else{
		data[id].porleer = "t";
		}

		localStorage.setItem("todoData", JSON.stringify(data));
	};

	todo.cambiocheckboxleido = function (){
		var id = document.getElementById("menu").dataset.idlibro;

		var estadoleido = data[id].leido;

		if (estadoleido == "t"){

		data[id].leido = "f";
		}else{

		data[id].leido = "t";
		}

		localStorage.setItem("todoData", JSON.stringify(data));
	};


todo.favoritoestado = false;
 todo.favoritearboton = function(){
	$( ".favyes" ).toggle();
	$( ".favno" ).toggle();
	if (todo.favoritoestado){
	todo.favoritoestado = false;
	}else {
	todo.favoritoestado = true;
	}
};
 todo.favoritearmemoria = function(){
	var id = document.getElementById("menu").dataset.idlibro;

	var estadofavorito = data[id].favorito;

	if (estadofavorito == "t"){
	data[id].favorito = "f";
	}else{
	data[id].favorito = "t";
	}
	localStorage.setItem("todoData", JSON.stringify(data));
	};

todo.favoritearambas = function(){
	todo.favoritearboton();
	todo.favoritearmemoria();
}
})(todo, data, jQuery);
