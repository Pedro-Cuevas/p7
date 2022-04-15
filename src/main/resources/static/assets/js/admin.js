const deleteOfferAndUpdate = async (id) => {
    let request = await fetch("/api/v1/offers/" + id, {
        method: 'DELETE',
    });

    if(request.ok) {
        getOffersAndDisplay();
    }
}

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
    }
}

getOffersAndDisplay();