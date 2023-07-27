import { createContext, useContext, useState, useEffect } from "react";

import { Order, Product } from "../models/order";
import { ORDER_STATES } from "../utils/config";

const orderContext = createContext(undefined);

const OrderState = ({ children }) => {
	const [order, setOrder] = useState(null);

	const addItemToOrder = (itemObj) => {
		setOrder((currentState) => {
			if (!currentState) {
				const newOrder = new Order({ state: ORDER_STATES.PENDING });
				newOrder.products.push(new Product(itemObj));
				return newOrder;
			}

			const itemIdxInOrder = currentState.products.findIndex(
				(item) => item.id === itemObj.id
			);

			if (itemIdxInOrder === -1) {
				// If item is not in order, add it with quantity 1 (default qty)
				currentState.products.push(new Product(itemObj));
			} else {
				currentState.products[itemIdxInOrder].qty += 1;
			}

			return { ...currentState };
		});
	};

	const removeItemFromOrder = (itemId) => {
		if (!order?.products) return;

		setOrder((currentState) => {
			const itemIdx = currentState.products.findIndex(
				(product) => product.id === itemId
			);

			if (itemIdx === -1) {
				// There is no such product in order
				return { ...currentState };
			}

			const productQty = currentState.products[itemIdx].qty;

			if (productQty <= 1) {
				currentState.products.splice(itemIdx, 1);
			} else {
				currentState.products[itemIdx].qty -= 1;
			}

			return { ...currentState };
		});
	};

	const getTotalOrderPrice = () =>
		order?.products?.reduce((acc, cv) => (acc += cv.price * cv.qty), 0);

	const getSelectedProducts = () =>
		order?.products?.map((product) => ({
			qty: product.qty,
			id: product.id,
		}));

	const getTotalSelectedProductQty = () =>
		order?.products?.reduce((acc, cv) => (acc += cv.qty), 0);

	// useEffect(() => {
	// 	console.log(order);
	// });

	const confirmOrder = () => {
		if (!order) return;
		const now = new Date();

		// Add 60 minutes to the current time
		const futureTime = new Date(now);
		futureTime.setMinutes(now.getMinutes() + 45);

		// Set new order state to cooking
		// Assign time to order
		setOrder((currentState) => ({
			...currentState,
			state: "cooking",
			timeUntilReadyForDelivery: futureTime,
		}));
	};

	return (
		<orderContext.Provider
			value={{
				order,
				addItemToOrder,
				removeItemFromOrder,
				getTotalOrderPrice,
				getSelectedProducts,
				getTotalSelectedProductQty,
				confirmOrder,
			}}
		>
			{children}
		</orderContext.Provider>
	);
};

export const useOrder = () => useContext(orderContext);

export default OrderState;
