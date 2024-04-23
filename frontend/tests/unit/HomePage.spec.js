// tests/unit/HomePage.spec.js

import { mount } from "@vue/test-utils";
import HomePage from "../../src/pages/HomePage.vue";

describe("HomePage.vue", () => {
  it("renders name input field", () => {
    const wrapper = mount(HomePage);
    expect(wrapper.find(".styled-input").exists()).toBe(true);
  });

  it("calls navigateToAbout method when Next button is clicked", async () => {
    const wrapper = mount(HomePage);
    const navigateToAboutMock = jest.fn();
    wrapper.vm.navigateToAbout = navigateToAboutMock;
    await wrapper.find(".styled-button").trigger("click");
    expect(navigateToAboutMock).toHaveBeenCalled();
  });
});
