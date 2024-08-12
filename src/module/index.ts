import accountInit from './accounts/account.init';

/**
 * Inside this Init function Other Module will be initialized
 * Such as Preloaded Data of `transaction`,`accounts`, `etc.`
 * This Init Function will be loaded at browser
 */
export async function init() {
	await accountInit();
}
