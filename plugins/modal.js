Element.prototype.appendAfter = function(element) {
	element.parentNode.insertBefore(this, element.nextSibling)
};

function noop() {};

function createModalFooter(buttons = []) {
	if (buttons.length === 0) {
		return document.createElement('div');
	}
	const wrapper = document.createElement('div');
	wrapper.classList.add('window-vmodal__footer');
	buttons.forEach((item) => {
		const btn = document.createElement('button');
		btn.textContent = item.text;
		btn.classList.add('btn');
		btn.classList.add(`btn-${item.type || 'secondary'}`);
		btn.onclick = item.handler || noop;
		wrapper.append(btn);
	});
	return wrapper;
};


function createModal(options) {
	const modal = document.createElement('div');
	const defaultWidth = '600px';
	modal.classList.add('vmodal');
	modal.insertAdjacentHTML('afterbegin', `
		<div class="vmodal__overlay" data-close="true">
			<div class="vmodal__window window-vmodal" style="width: ${options.width || defaultWidth}">
				<div class="window-vmodal__header">
					<span class="window-vmodal__title">${options.title || 'Window'}</span>
					${ options.closeble ? `<span class="window-vmodal__close" data-close="true">&times;</span>`: ''}
				</div>
				<div class="window-vmodal__body" data-content>
					${options.content || ''}
				</div>
			</div>
		</div>
	`)
	const footer = createModalFooter(options.footerBtns);
	footer.appendAfter(modal.querySelector('[data-content]'));
	document.body.appendChild(modal);
	return modal;
};

$.modal = function(options) {
	const $modal = createModal(options);
	const animationSpeed = 200;
	let closing = false;
	let destroyed = false;

	const modalObj = {
		open() {
			if (destroyed) {
				return console.log('Modal is destroyed');
			}
			!closing && $modal.classList.add('open');
		},
		close() {
			closing = true;
			$modal.classList.remove('open');
			$modal.classList.add('hide');
			setTimeout(() => {
				closing = false;
				if (typeof options.onClose === 'function') {
					options.onClose();
				}
				$modal.classList.remove('hide');
			}, animationSpeed);
		}
	};

	const modalListener = (e) => {
		if (e.target.dataset.close) {
			modalObj.close();
		}
	};

	$modal.addEventListener('click', modalListener);

	return Object.assign(modalObj, {
		destroy() {
			$modal.parentNode.removeChild($modal);
			$modal.removeEventListener('click', modalListener);
			destroyed = true;
		},
		setContent(html) {
			$modal.querySelector('[data-content]').innerHTML = html;
		}
	});
}