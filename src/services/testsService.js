export const findByTestAttr = (wrapper, attr) => (
    wrapper.find(`[data-test="${attr}"]`)
);
