let fruits = [
	{id: 1, title: 'Apples', price: 20, img: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
	{id: 2, title: 'Oranges', price: 30, img: 'https://catherineasquithgallery.com/uploads/posts/2021-03/1614548328_48-p-apelsin-na-belom-fone-64.jpg'},
	{id: 3, title: 'Mango', price: 50, img: 'https://s.alicdn.com/@sc04/kf/Ueb7cd7a5accd49a186a5aac277afc12e0.png'}
];

const cardToHtml = (card) => {
	return `
		<div class="col">
			<div class="card">
				<img src="${card.img}" class="card-img-top" style="height: 300px;" alt="${card.title}">
				<div class="card-body">
					<h5 class="card-title">${card.title}</h5>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<a href="#" class="btn btn-primary" data-btn="price" data-id="${card.id}">Посмотреть цену</a>
					<a href="#" class="btn btn-danger" data-btn="remove" data-id="${card.id}">Удалить</a>
				</div>
			</div>
		</div>
  `
};

function renderCards (arr) {
	const html = arr.map((el) => cardToHtml(el)).join('');
	return document.querySelector('#fruits').innerHTML = html;
};
renderCards(fruits);


const priceModal = $.modal({
	title: 'Product price', 
	width: '500px',
	closeble: true,
	footerBtns: [
		{text: 'Close', type: 'primary', handler() {
			priceModal.close();
		}}
	]
});

const confirmModal = $.modal({
	title: 'Are you sure?', 
	width: '500px',
	closeble: true,
	footerBtns: [
		{text: 'Cancel', type: 'secondary', handler() {
			priceModal.close();
		}},
		{text: 'Remove', type: 'danger', handler() {
			priceModal.close();
		}},
	]
});

document.addEventListener('click', (e) => {
	e.preventDefault();
	const btnType = e.target.dataset.btn;
	const id = +e.target.dataset.id;
	const card = fruits.find(fruit => fruit.id === id);
	if (btnType === 'price') {
		priceModal.setContent(`
			<p>Price of ${card.title} is <strong>${card.price} $</strong></p>
		`);
		priceModal.open();
	} else if (btnType === 'remove') {
		$.confirm({
			title: 'Are you sure?', 
			content: `<p>You remove the <strong>${card.title}</strong></p>`
		}).then(() => {
			fruits = fruits.filter((el) => el.id !== id);
			renderCards(fruits);
		}).catch(() => {
			console.log('Cancel');
		});
	}
});
