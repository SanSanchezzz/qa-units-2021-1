import React from 'react'
import {sortByItemCount, getSortFunction, sortByDate, sortOrders} from './sortOrders';
import {sortTypes} from "./sortOrders";
import {fakeOrders} from "../data/fakeOrders";

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('orders are not object', () => {
		const result = sortByItemCount(2, 1);
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('the first order has more items than the second', () => {
		const order1 = {
			items: ['1', '2', '3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('the second order has more items than the first', () => {
		const order1 = {
			items: ['1', '2'],
		};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('items are null', () => {
		const order1 = {
			items: null,
		};

		const order2 = {
			items: null,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('item are null', () => {
		const order1 = {
			items: ['1', '2'],
		};

		const order2 = {
			items: null,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('orders are null', () => {
		const result = sortByDate(null, null);
		expect(result).toEqual(0);
	});

	it('orders are not object', () => {
		const result = sortByDate(2, 1);
		expect(result).toEqual(0);
	});

	it('dates are null', () => {
		const order1 = {
			date: null,
		};

		const order2 = {
			date: null,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('the first order was earlier than the second', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 100,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	it('the second order was earlier than the first', () => {
		const order1 = {
			date: 100,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('same date', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('sortType by Date', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toEqual(sortByDate);
	});

	it('sortType by Count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toEqual(sortByItemCount);
	});

	it('sortType is null', () => {
		const result = getSortFunction(null);
		expect(result).toBeUndefined();
	});
});

describe('sortOrders function', () => {
	it('callback has been called', () => {
		const callback = jest.fn();
		sortOrders(fakeOrders, callback);
		expect(callback).toHaveBeenCalled();
	});

	it('callback has not been called, orders are null', () => {
		const callback = jest.fn();
		sortOrders(null, callback);
		expect(callback).toHaveBeenCalledTimes(0);
	});

	it('callback has not been called, sortFunction are null', () => {
		const orders = fakeOrders;
		sortOrders(orders, null);
		expect(orders).toStrictEqual(fakeOrders);
	});
});
