import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> if authenticated", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should have Logout and Orders items if authenticated", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
    expect(
      wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)
    ).toEqual(true);
  });
});
