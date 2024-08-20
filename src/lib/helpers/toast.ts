import cuid from './cuid';

const html = String.raw;
export const icons = {
	success: html`<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m4.768-11.36a1 1 0 1 0-1.536-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.006.006l-.007-.005c-.168-.127-.383-.339-.765-.722l-1.452-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451l.041.041c.327.327.64.641.933.862c.327.248.756.48 1.305.456c.55-.025.956-.296 1.26-.572c.27-.247.555-.588.85-.943l.037-.044z"
			clip-rule="evenodd"
		/>
	</svg>`,
	danger: html`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m4.768-11.36a1 1 0 1 0-1.536-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.006.006l-.007-.005c-.168-.127-.383-.339-.765-.722l-1.452-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451l.041.041c.327.327.64.641.933.862c.327.248.756.48 1.305.456c.55-.025.956-.296 1.26-.572c.27-.247.555-.588.85-.943l.037-.044z"
			clip-rule="evenodd"
		/>
	</svg>`,
	warning: html`<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m4.768-11.36a1 1 0 1 0-1.536-1.28l-3.598 4.317c-.347.416-.542.647-.697.788l-.006.006l-.007-.005c-.168-.127-.383-.339-.765-.722l-1.452-1.451a1 1 0 0 0-1.414 1.414l1.451 1.451l.041.041c.327.327.64.641.933.862c.327.248.756.48 1.305.456c.55-.025.956-.296 1.26-.572c.27-.247.555-.588.85-.943l.037-.044z"
			clip-rule="evenodd"
		/>
	</svg>`,

	closeBtnIcon: html`
		<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
			/>
		</svg>
	`
};

export type Required<T> = {
	[P in keyof T]-?: T[P];
};
export type ToastParams = {
	html?: string;
	text?: string;
	type?: 'success' | 'danger' | 'warning' | 'neutral';
	position?: 'top' | 'bottom' | 'bottom-center' | 'top-center' | 'left' | 'right';
	containerTemplate?: typeof containerTemplate;
	contentTemplate?: typeof contentTemplate;
	autoRemove?: boolean;
	duration?: number;
	onHide?: (() => unknown) | null;
};
type RequiredToastParams = Required<ToastParams>;

function containerTemplate(id: string, config: RequiredToastParams) {
	return html`<div
		class="fixed space-y-2 bns-toast-container ${config.position} right-0 top-0 p-2 pointer-events-none"
		id="${id}"
	></div>`;
}
function contentTemplate(id: string, config: RequiredToastParams) {
	return html`
		<div
			class="bns-toast default-toast border pointer-events-auto relative border-gray-300 bg-white min-w-80 max-w-[700px] flex rounded-md text-gray-500"
			id="${id}"
		>
			<div class="flex relative p-2 grow items-center isolate">
				<div
					class="absolute progress-animation w-0 h-full bg-gray-200 -z-10 left-0 rounded-md"
					style="--duration:5s"
				></div>
				${config.type === 'neutral'
					? ''
					: html`<div class="text-3xl mr-1 text-green-500">${icons[config.type]}</div>`}

				<div class="">${config.html ? config.html : html`<p>${config.text}</p>`}</div>
			</div>

			<div class="shrink-0 grow-0">
				<button
					class="toast-close-btn text-center border-l h-full px-0.5 hover:bg-red-100 hover:text-red-900 active:bg-red-200 hover:border-l-red-200 transition rounded-r-md text-gray-500"
				>
					${icons.closeBtnIcon}
				</button>
			</div>
		</div>
	`;
}

// Getting Container By Position - Because every positioned toast will have separate container;
const getContainer = (position: RequiredToastParams['position']) =>
	document.querySelector('.bns-toast-container.' + position);

// Getting a Content from a container;
const getContent = (container: HTMLDivElement, id: string) =>
	container.querySelector('#' + id) as HTMLDivElement | undefined;
const getCloseBtn = (content: HTMLDivElement) =>
	content.querySelector('.toast-close-btn') as HTMLButtonElement | undefined;

const defaultConfig = {
	text: 'No Text Provided',
	position: 'top',
	type: 'neutral',
	autoRemove: true,
	containerTemplate,
	contentTemplate,
	duration: 5000,
	onHide: null,
	html: ''
} as RequiredToastParams;

export default async function toast(param?: ToastParams) {
	return new Promise((resolve, reject) => {
		const config = { ...defaultConfig, ...param };
		const id = isSecureContext ? globalThis.crypto.randomUUID() : cuid(20);
		const documentBody = document.getElementsByTagName('body')[0];
		let container = getContainer(config.position) as HTMLDivElement;
		if (!container) {
			documentBody.insertAdjacentHTML('beforeend', config.containerTemplate(id, config));
			container = getContainer(config.position) as HTMLDivElement;
		}

		// checking if Container Exist;
		if (container) {
			const content = config.contentTemplate(id, config);
			container.insertAdjacentHTML('afterbegin', content);
			const contentEl = getContent(container, id);
			const cancelBtn = getCloseBtn(contentEl as HTMLDivElement) as HTMLButtonElement;

			if (cancelBtn) {
				cancelBtn.addEventListener('click', function () {
					config.onHide?.();
					contentEl?.remove();
				});
			}
			// After Done all Operation Resolving the Promise;
			resolve(true);

			if (config.autoRemove) {
				setTimeout(() => {
					contentEl?.remove();
				}, config.duration);
			}
		} else {
			reject('toast container not found');
		}
	});
}
