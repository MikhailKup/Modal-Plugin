$.confirm = function(options) {
	return new Promise((resolve, reject) => {
		const modal = $.modal({
			title: options.title, 
			width: '500px',
			closeble: false,
			content: options.content,
			onClose() {
				modal.destroy();
			},
			footerBtns: [
				{text: 'Cancel', type: 'secondary', handler() {
					modal.close();
					reject();
				}},
				{text: 'Remove', type: 'danger', handler() {
					modal.close();
					resolve();
				}},
			]
		});
		setTimeout(() => modal.open(), 100);
	});
};