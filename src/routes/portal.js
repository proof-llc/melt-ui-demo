export const usePortal = (el, target = 'body') => {
	let targetEl;
	async function update(newTarget) {
		target = newTarget;

		targetEl = document.querySelector(target);

		el.dataset.portal = '';
		targetEl.appendChild(el);
		el.hidden = false;
	}
	function destroy() {
		el.remove();
	}
	update(target);
	return {
		update,
		destroy
	};
};
