import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";
import configureStore from "../../store/configureStore";
import { findByTestAttr } from "../../services/testsService";

const setup = (state = {}, match) => {
    const store = configureStore(state);
    const wrapper = shallow(<EmployeeForm store={store} match={match} />).dive();
    return [wrapper , store];
};

describe("<EmployeeForm />", () => {
    const employee = {
        name: "test",
        address: "test address",
        birthdate: "1992-10-02",
        status: "Inactive",
        position: "Developer",
        created: "2020-06-23",
        updated: "2020-06-23",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
    };
    
    describe("New employee", () => {
        const newEmployee = { ...employee };
        const match = { params: { employeeId: "new" } };
        let store;
        let wrapper;
        let fakeAxios;
        
        beforeEach(() => {
            fakeAxios = new MockAdapter(axios);
            [wrapper, store] = setup({}, match);
        });
        
        test("Renders without errors", () => {
            const component = findByTestAttr(wrapper, "component-employee-form");
            expect(component.length).toBe(1);
        });

        test("Adds new employee to employees list piece of state when submited", async () => {
            const { getState } = store;
            const expectedState = { employees: { list: [{ ...newEmployee, id: 1 }] } };
            fakeAxios.onPost(`${process.env.REACT_APP_API_URL}employees`).reply(201, { employee: { ...newEmployee, id: 1 } });

            await wrapper.instance().props.saveEmployee(newEmployee);
            const actualState = getState();

            expect(actualState).toEqual(expectedState);
        });
    });

    describe("Edit employee", () => {
        const employeeToEdit = { id: "10", ...employee };
        const match = { params: { employeeId: "10" } };
        const initialState = { employees: { list: [employeeToEdit] } };
        let store;
        let wrapper;
        let fakeAxios;

        beforeEach(() => {
            fakeAxios = new MockAdapter(axios);
            [wrapper, store] = setup(initialState, match);
        });
 
        test("Renders without errors", () => {
            const component = findByTestAttr(wrapper, "component-employee-form");
            expect(component.length).toBe(1);
        });

        test("Edits an existing employee information correctly", async () => {
            const { getState } = store;
            const expectedState = { employees: { list: [{ ...employeeToEdit, name: "test edited" }] } };
            fakeAxios.onPut(`${process.env.REACT_APP_API_URL}employees/10`).reply(200, { employee: { ...employeeToEdit, name: "test edited" } });

            await wrapper.instance().props.saveEmployee(employeeToEdit);
            const actualState = getState();

            expect(actualState).toEqual(expectedState);
        });
    });
});
