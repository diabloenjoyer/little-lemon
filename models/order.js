// Dont add methods here, update directly through state

export class Product {
	constructor({ id, name, price, description, image, category }) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.qty = 1;
		this.category = category;
	}
}

export class Order {
	constructor({ state }) {
		this.products = [];
		this.state = state;
		this.timeUntilReadyForDelivery = null;
	}
}
