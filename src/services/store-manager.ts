class StoreManager {
	private store: Map<string, any>;

	constructor() {
		this.store = new Map<string, any>([
			[
				"1",
				{
					notificationPreferences: {
						events: {
							gameEvent: true,
							socialEvent: true,
						},
						channels: {
							email: false,
							push: true,
							telegram: true,
						},
					},
				},
			],
			[
				"2",
				{
					notificationPreferences: {
						events: {
							gameEvent: true,
							socialEvent: true,
						},
						channels: {
							email: true,
							push: false,
							telegram: false,
						},
					},
				},
			],
		]);
	}

	// Method to add an item to the store
	addItem(key: string, value: any): void {
		this.store.set(key, value);
	}

	// Method to retrieve an item from the store
	getItem(key: string): any | undefined {
		return this.store.get(key);
	}

	// Method to remove an item from the store
	removeItem(key: string): boolean {
		return this.store.delete(key);
	}

	// Method to clear the store
	clearStore(): void {
		this.store.clear();
	}

	// Method to get all items in the store
	getAllItems(): Map<string, any> {
		return this.store;
	}
}

export default StoreManager;
