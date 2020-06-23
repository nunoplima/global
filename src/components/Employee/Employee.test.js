import React from "react";
import { shallow } from "enzyme";
import * as ReactRedux from "react-redux";
import Employee from "../Employee/Employee";
import configureStore from "../../store/configureStore";
import { deleteEmployee } from "../../store/employees";
import { findByTestAttr } from "../../services/testsService";

const setup = (initialState, props) => {
    // mock "redux hooks" mocked, this way it won't check whether the component is wrapped in a Provider
    const mockUseSelector = () => initialState.employees.list;
    const mockUseDispatch = () => jest.fn();
    
    ReactRedux.useSelector = mockUseSelector;
    ReactRedux.useDispatch = mockUseDispatch;

    // store and wrapper
    const store = configureStore(initialState);
    const wrapper = shallow(<Employee store={store} {...props} />);
    return [wrapper, store];
};

describe("<Employee />", () => {
    const employee = {
        id: "10",
        name: "test",
        address: "test address",
        birthdate: "1992-10-02",
        status: "Inactive",
        position: "Developer",
        created: "2020-06-23",
        updated: "2020-06-23",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
    };
    const { id: employeeId } = employee;
    const mockDeleteEmployee = jest.fn();
    const initialState = { employees: { list: [employee] } };
    const props = { employee, onDelete: mockDeleteEmployee };
    let wrapper;
    let store;

    beforeEach(() => {
        [wrapper, store] = setup(initialState, props);
    });

    test("Renders without errors", () => {
        const component = findByTestAttr(wrapper, "component-employee");
        expect(component.length).toBe(1);
    });

    test("Removes selected employee from the employees list piece of state", () => {
        store.dispatch(deleteEmployee(employeeId));
        const actualList = store.getState().employees.list;
        
        expect(actualList.length).toBe(0);
    });

    test("Calls the api to delete the selected employee and does it with the correct argument", () => {
        const deleteButton = findByTestAttr(wrapper, "delete-button");
        
        deleteButton.simulate("click");
        const numberOfCalls = mockDeleteEmployee.mock.calls.length;
        const mockArgument = mockDeleteEmployee.mock.calls[0][0];
        
        expect(mockArgument).toBe(employeeId);
        expect(numberOfCalls).toBe(1);
    });
});
