import React from 'react'
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {fakeOrders} from "../data/fakeOrders";
import Order from "./Order";

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});

describe('Order.js', () => {
  beforeEach(() => {
    getDate.mockReturnValue('11 января');
  });

  afterEach( () => {
    getDate.mockClear();
  });

  it('render with order is null', () => {
    const wrapper = shallow(<Order
        order = {null}
    />);

    expect(wrapper.getElement()).toBeNull();
  });

  it('getDate not called with null', () => {
    shallow(<Order
        order = {null}
    />);

    expect(getDate).toHaveBeenCalledTimes(0);
  });

  it('shop and date are null', () => {
    const wrapper = shallow(<Order
        order = {{shop: null, date: null}}
    />);

    expect(wrapper).toMatchSnapshot();
    expect(getDate).toHaveBeenCalledTimes(0);
  });

  it('getDate has been called', () => {
    const order = fakeOrders[0];

    const wrapper = shallow(<Order
        order = {order}
    />);

    expect(wrapper).toMatchSnapshot();
    expect(getDate).toHaveBeenCalledTimes(1);
  });

  it('getDate has been called without items', () => {
    const wrapper = shallow(<Order
        order = {{shop: 'shop', date: 'date', items: null}}
    />);

    expect(wrapper).toMatchSnapshot();
    expect(getDate).toHaveBeenCalledTimes(1);
  });
});

