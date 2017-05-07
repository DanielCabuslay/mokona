function createListEntry(id, id_data) {
	var entry = document.createElement('li');
	entry.id = id;
	entry.className += 'mdc-list-item';

	var thumbnailSpan = document.createElement('span');
	thumbnailSpan.className += 'mdc-list-item__start-detail laptop-icon-bg';

	var thumbnail = document.createElement('img');
	thumbnail.src = 'images/' + id + '.png';

	thumbnailSpan.append(thumbnail);

	var nameSpan = document.createElement('span');
	nameSpan.className += 'mdc-list-item__text';
	var name = document.createTextNode(id_data['name']);
	nameSpan.append(name);

	var priceSpan = document.createElement('span');
	priceSpan.className += 'mdc-list-item__text__secondary';
	var price = document.createTextNode(id_data['price1']);
	if (price.length != 4) {
		priceSpan.append(price);
	} else {
		priceSpan.append(id_data['release']);
	}
	nameSpan.append(priceSpan);

	entry.append(thumbnailSpan);
	entry.append(nameSpan);

	var hr = document.createElement('hr');
	hr.className += 'laptop-list-divider';

	$('.mdc-list').append(entry);
	$('.mdc-list').append(hr);
}