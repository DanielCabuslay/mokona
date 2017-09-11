function createInfoSection(id, id_data) {
	var image = 'images/' + id + '.png';
    if ($(window).width() > 599) {
		$('#banner-image > img').prop('src', image);
	} else {
		$('#banner-image').css('background-image', 'url(' + image + ')');
	}

	$('#banner-title').text(id_data['name']);
	$('#info-title').text(id_data['name']);
	$('#banner-subtitle').text(id_data['release']);
	$('#specs-notes > div').text(id_data['notes']);

	//os
	var operatingSystem;
	if (id_data['os'] == 'w10') {
		operatingSystem = 'Windows 10';
	} else if (id_data['os'] == 'w10ch') {
		operatingSystem = 'Windows 10 (Chinese)';
	} else if (id_data['os'] == 'chrome') {
		operatingSystem = 'Chrome OS';
	} else if (id_data['os'] == 'macsierra') {
		operatingSystem = 'macOS Sierra';
	} else if (id_data['os'] == 'w10s') {
		operatingSystem = 'Windows 10 S';
	}
	$('#os > .specs-spec').text(operatingSystem);

	//type
	var type;
	if (id_data['type'] == 'c') {
		type = 'Convertible';
	} else if (id_data['type'] == 'l') {
		type = 'Laptop';
	} else if (id_data['type'] == 't') {
		type = 'Tablet'
	}
	$('#type > .specs-spec').text(type);

	//display
	var touch = '';
	if (id_data['display_touch'] == 'y') {
		touch = 'Touchscreen<br>';
	}
	$('#display > .specs-spec').html(id_data['display_size'] + ' inches<br>' + id_data['display_res'] + '<br>' + id_data['display_ratio'] + '<br>' + touch +  id_data['display_type']);

	//processor
	$('#processor > .specs-spec').html(id_data['processor_model'] + '<br>' + id_data['processor_speed'] + ' GHz');

	//ram
	$('#ram > .specs-spec').html(id_data['ram_size'] + ' GB<br>' + id_data['ram_speed']);

	//storage
	var storageSpeed = '';
	if (id_data['storage_speed'] != null) {
		storageSpeed = id_data['storage_speed'] + '<br>';
	}
	$('#storage > .specs-spec').html(id_data['storage'] + ' GB<br>' + storageSpeed +  id_data['storage_type']);

	//battery
	var wHr = '';
	var cell = '';
	if (id_data['battery_whr'] != null) {
		wHr = id_data['battery_whr'] + ' WHr<br>';
	}
	if (id_data['battery_cell'] != null) {
		cell = id_data['battery_cell'] + ' cell';
	}
	if (wHr != '' || cell != '') {
		$('#battery > .specs-spec').html(wHr + cell);		
	} else if (wHr == '' && cell == '') {
		$('#battery > .specs-spec').text('Unknown');
	}

	//weight
	$('#weight > .specs-spec').text(id_data['weight'] + ' lbs');

	//prices
	// $('#vendor-button').text('Starting at ' + id_data['price1']);

	var vendors = 4; // change when more vendors are added
	$('.store-row').remove();
	if (id_data['price1'] != null) {
		$('#purchase-button').show();
		for (i = 0; i < vendors; i++) {
			var jsonVendor = 'vendor' + (i + 1);
			var jsonLink = 'link' + (i + 1);
			var jsonPrice = 'price' + (i + 1);
			var jsonSale = 'sale' + (i + 1);
			var jsonCoupon = 'coupon' + (i + 1);

			if (id_data[jsonPrice] != null) {
				var storeRowDiv = document.createElement('div');
				storeRowDiv.className += 'store-row';

				var buttonDiv = document.createElement('div');
				buttonDiv.className += 'store-row-button';

				var buttonLink = document.createElement('a');
				buttonLink.className += id_data[jsonVendor] + '-store-button store-button mdc-elevation--z2';

				var href = document.createAttribute('href');
				href.value = id_data[jsonLink];

				var target = document.createAttribute('target');
				target.value = '_blank';

				buttonLink.setAttributeNode(href);
				buttonLink.setAttributeNode(target);

				buttonDiv.appendChild(buttonLink);
				storeRowDiv.appendChild(buttonDiv);

				var priceRowDiv = document.createElement('div');
				priceRowDiv.className += 'store-row-price';

				var priceString = id_data[jsonPrice];
				if (id_data[jsonSale] != null) {
					priceString += ' (save ' + id_data[jsonSale];
					// priceString += '*';
					if (id_data[jsonCoupon] != null) {
						priceString += ' with coupon code ' + id_data[jsonCoupon];
					}
					priceString += ')';
				} 
				var priceNode = document.createTextNode(priceString);
				priceRowDiv.appendChild(priceNode);
				storeRowDiv.appendChild(priceRowDiv);

				$('.store-table').append(storeRowDiv);
			}
			
		}
	} else {
		$('#purchase-button').hide();
	}
	

}