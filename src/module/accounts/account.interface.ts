export interface AccountI {
	documentId: string;
	id: string;
	name: string;
	logo?: string;
	amount: {
		official: number;
		unOfficial: number;
	};
	color?: string;
}
