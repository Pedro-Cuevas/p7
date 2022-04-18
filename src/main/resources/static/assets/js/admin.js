//leaves spaces blank
const clearAll= () => {
    let nombre = document.getElementById("inputName");
    nombre.value = "";

    let inicio = document.getElementById("inputDateBegining");
    inicio.value = "";
    let fin = document.getElementById("inputDateEnd");
    fin.value = "";

    let descripcion = document.getElementById("inputDescription");
    descripcion.value ="";
    let available = document.getElementById("available");
    available.outerHTML = '<input class="form-check-input" type="checkbox" value="" id="available">';

    let boton = document.getElementById("btnOferta");
    //boton.setAttribute("id", "btnOferta");
    boton.innerHTML = "Subir oferta";


}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// deletes an offer, gets the new list of offers and displays it
const deleteOfferAndUpdate = async (id) => {
    let request = await fetch("/api/v1/offers/" + id, {
        method: 'DELETE',
    });

    if(request.ok) {
        console.log("oferta eliminada");
        getOffersAndDisplay();        
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// creates an offer, gets the new list of offers and displays it
const createOfferAndDisplay = async () => {

    let dates = await getDates();
    begin = dates.begining;
    end = dates.end;

    let txt_body = '{ "offerName": "'
        + $('#inputName').val()
        + '", "dateBegining": "'
        + begin
        + '", "dateEnd": "'
        + end
        + '", "offerDescription": "'
        + $('#inputDescription').val()
        + '", "offerAvailable": "'
        + $('#available').val()
        + '"}';

    let request = await fetch("/api/v1/offers", {
        body: txt_body,
        method: 'POST',
        body: txt_body,
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request.ok) {
        console.log("oferta creada");
        clearAll();
        getOffersAndDisplay();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const getDates = async () => {
    let a = $('#inputDateBegining').val();
    let b = $('#inputDateEnd').val();

    let begining = a.substr(-4,4) + '-' + a.substr (3,2) + '-' + a.substr(0,2);
    let end = b.substr(-4,4) + '-' + b.substr (3,2) + '-' + b.substr(0,2);

    return {begining, end}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAvailable = async () => {
    let available = document.getElementById("available");
    let txtAvailable;
        
    if (available.outerHTML = '<input class="form-check-input" type="checkbox" value="" id="available">') {
        txtAvailable == "No disponible";
    } else {
        txtAvailable == "Disponible"
    }

    return txtAvailable;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// gets the new list of offers and displays it
const getOffersAndDisplay = async () => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();

        let text = '<ul class="list-group">';
        res.forEach(obj => {
            text += '<li class="list-group-item">'
            +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
            + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-secondary"'
            + ' id="' + obj.id
            + 'edit_btn">Editar</button> <button type="submit" class="btn btn-danger"'
            + ' id="' + obj.id
            + 'delete_btn">Eliminar</button></div> </li>';
        });
        text += '</ul>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'delete_btn').click(() => deleteOfferAndUpdate(obj.id));
        });

        res.forEach(obj => {
            $('#' + obj.id + 'edit_btn').click(() => editOffer(obj.id));
        });
    }

    //let val = $('#inputDateBegining').val();
    //console.log(val);
}

////////////////////////////////////////////////////////////////////////////////////////////////
//lets user edit an offer
const editOffer = async (id) => {
    let request = await fetch("/api/v1/offers/"+ id, {
        method: 'GET',
    });

    if(request.ok) {
        let obj = await request.json();
        let nombre = document.getElementById("inputName");
        nombre.value = obj.offerName;

        let inicio = document.getElementById("inputDateBegining");
        inicio.value = obj.dateBegining;
        let fin = document.getElementById("inputDateEnd");
        fin.value = obj.dateEnd;

        let descripcion = document.getElementById("inputDescription");
        descripcion.value = obj.offerDescription;
        let available = document.getElementById("available");
       
        if(obj.offerAvailable == "No disponible"){
            available.outerHTML = '<input class="form-check-input" type="checkbox" value="" id="available">';
        } else {
            available.outerHTML = '<input class="form-check-input" type="checkbox" value="" id="available" checked>';
        }
        
        let boton = document.getElementById("btnOferta");
       //boton.setAttribute("id", "btnCambios");
        boton.innerHTML = "Guardar cambios";

        $('#btnOferta').click(() => updateOffers(id));
        
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
//lets user upload offer editted
const updateOffers = async (id) => {
    let request = await fetch("/api/v1/offers/"+ id, {
        method: 'GET',
    });

    if(request.ok) {
        
        let dates = await getDates();
        begin = dates.begining;
        end = dates.end;

        let available = await getAvailable();

        let txt_body = '{ "offerName": "'
            + $('#inputName').val()
            + '", "dateBegining": "'
            + $('#inputDateBegining').val()
            + '", "dateEnd": "'
            + $('#inputDateEnd').val()
            + '", "offerDescription": "'
            + $('#inputDescription').val()
            + '", "offerAvailable": "'
            + available
            + '"}';

        let request2 = await fetch("/api/v1/offers/" + id, {
            body: txt_body,
            method: 'PUT',
            //body: txt_body,
            headers: {
                "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
            },
            dataType: "json",
        });

        if(request2.ok) {
            console.log("oferta actualizada");
            clearAll();
            getOffersAndDisplay();
        }
    }
}

//const updateOrCreate = () => {
//    let boton = document.getElementById("btnOferta");
//    if(boton.innerHTML == "Guardar cambios"){
//        updateOffers();
//    } else {
//        createOfferAndDisplay();
//    }
    
//}

/////////////////////////////////////////////////////////////////////////////////

$('#btnOferta').click(() => createOfferAndDisplay());
getOffersAndDisplay();


// el problema es que al presionar el boton se ejecutan los dos métodos a los que se llama
// al hacer click. He probado con setAttribute y da error a la larga

// Además, al hacer PUT no se actualiza la oferta, sino que se crea una nueva y no se borra la anterior

// Cuando da error con POST es por el formato de las fechas (al seleccionar en el calendario tienen uno
// y al ponerse al dar a editar se ponen otras)

// Otro error es que si das a actualizar por segunda vez, se crean dos nuevas. Si das tres, se crean tres nuevas, etc

