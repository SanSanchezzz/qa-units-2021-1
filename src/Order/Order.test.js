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

  it('render with shop and date are null', () => {
    const wrapper = shallow(<Order
        order = {{shop: null, date: null}}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('getDate not called with shop and date are null', () => {
    shallow(<Order
        order = {{shop: null, date: null}}
    />);

    expect(getDate).toHaveBeenCalledTimes(0);
  });

  it('getDate has been called', () => {
    const order = fakeOrders[0];

    shallow(<Order
        order = {order}
    />);

    expect(getDate).toHaveBeenCalledTimes(1);
  });

  it('render with some fake data', () => {
    const order = fakeOrders[0];

    const wrapper = shallow(<Order
        order = {order}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('getDate has been called without items', () => {
    shallow(<Order
        order = {{shop: 'shop', date: 'date', items: null}}
    />);

    expect(getDate).toHaveBeenCalledTimes(1);
  });

  it('render with items null', () => {
    const wrapper = shallow(<Order
        order = {{shop: 'shop', date: 'date', items: null}}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});

