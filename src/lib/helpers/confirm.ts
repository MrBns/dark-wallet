import { default as cuid } from './id';

type ConfirmParams = {
	html?: string;
	title?: string;
};
const html = String.raw;
export default async function Confirm(params: ConfirmParams) {
	return new Promise((res) => {
		{
			console.log(globalThis);
			const id = `modal-${isSecureContext ? window.crypto.randomUUID() : cuid(30)}`;
			const template = ({ title = 'Confirmation' }) =>
				html` <!--Modal Backdrop -->
					<div
						id="${id}-backdrop"
						class="fixed w-full h-full bg-black/30 z-[49] backdrop-blur left-0 bottom-0"
					></div>
					<!--Modal Elements -->
					<div
						id="${id}"
						class="fixed bg-white bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 min-w-[450px] rounded-xl "
					>
						<div class="flex border-b bg-gray-100 title p-2 rounded-t-lg">
							<h1 class="text-lg text-gray-700 font-medium select-none">${title}</h1>
						</div>

						<div class="body min-h-[200px] p-4" id="${id}-body"></div>

						<div class="flex footer">
							<button
								id="${id}-cancel-button"
								class="flex-1 border-2 active:border-red-500 active:bg-red-100 border-red-100 hover:border-red-300 bg-red-100 text-red-900 hover:bg-red-200 px-6 py-2 rounded-bl-md"
							>
								Cancel
							</button>

							<button
								id="${id}-ok-button"
								class="flex-1 border-2 border-green-100 active:border-green-600 active:bg-green-100 hover:border-green-400 bg-green-100 text-green-900 hover:bg-green-200 px-6 py-2 rounded-br-md"
							>
								Ok
							</button>
						</div>
					</div>`;

			const modalContainer = document.getElementById('modal-container')! as HTMLDivElement;

			/* Modal Wrapper */
			const modalWrapper = document.createElement('div');
			modalWrapper.className = 'contents';
			modalWrapper.innerHTML = template({ title: params.title });

			/* Buttons */
			const cancelBtn = modalWrapper.querySelector(`#${id}-cancel-button`) as HTMLButtonElement;
			const okBtn = modalWrapper.querySelector(`#${id}-ok-button`) as HTMLButtonElement;
			const bodyEl = modalWrapper.querySelector(`#${id}-body`) as HTMLDivElement;
			console.log({ cancelBtn, okBtn, bodyEl });

			cancelBtn.addEventListener('click', function () {
				setTimeout(remove, 100);
				return res(false);
			});
			okBtn.addEventListener('click', function () {
				console.log({ okBtn });
				setTimeout(remove, 100);
				return res(true);
			});

			const remove = () => {
				modalWrapper.remove();
			};

			// Showing Modal;
			bodyEl.innerHTML = params.html || '';
			modalContainer.insertAdjacentElement('beforeend', modalWrapper);
		}
	});
}
