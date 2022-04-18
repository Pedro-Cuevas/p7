// deletes an offer, gets the new list of offers and displays it
const deleteOfferAndUpdate = async (id) => {
    let request = await fetch("/api/v1/offers/" + id, {
        method: 'DELETE',
    });

    if(request.ok) {
        getOffersAndDisplay();
    }
}

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
        getOffersAndDisplay();
    }
}

// deletes an offer, gets the new list of offers and displays it
const getDates = async () => {
    let a = $('#inputDateBegining').val();
    let b = $('#inputDateEnd').val();

    let begining = a.substr(-4,4) + '-' + a.substr (3,2) + '-' + a.substr(0,2);
    let end = b.substr(-4,4) + '-' + b.substr (3,2) + '-' + b.substr(0,2);

    return {begining, end}
}

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

    let val = $('#inputDateBegining').val();
    console.log(val);
}

$('#btnOferta').click(() => createOfferAndDisplay());
getOffersAndDisplay();

const editOffer = async (id) => {
    console.log("HOLA");

}

