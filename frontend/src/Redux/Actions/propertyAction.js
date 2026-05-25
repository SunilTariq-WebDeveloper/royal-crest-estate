import axios from "axios";
import apis from "../../../config/apis.js";
import { setloading, setError, setProperty, setProperties,removeProperty } from "../Slices/propertySlice.js"
export const fetchProperty = (id) => async (dispatch) => {
    try {
        dispatch(setloading())
        const { data } = await axios.get(`${apis[1]}/${id}`);
        const { total, property, error } = data;
        console.log(property);
        dispatch(setProperty(property))
    } catch (err) {
        console.log(err.message);
    }
}
export const fetchAllPropertiesAdmin = () => async (dispatch, getState) => {
    try {
        dispatch(setloading());

        const { auth } = getState();
        const token = auth?.token;

        const { data } = await axios.get(`${apis[1]}/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch(setProperties(data.properties));

    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.message));
    }
};


export const fetchApprovedProperties = () => async (dispatch) => {
    try {
        dispatch(setloading());

        const { data } = await axios.get(`${apis[1]}/all`);

        dispatch(setProperties(data.properties));

    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.message));
    }
};
export const fetchAgentProperties = () => async (dispatch, getState) => {
    try {
        dispatch(setloading());
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            dispatch(setError("Please login first"));
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const { data } = await axios.get(`${apis[1]}/agent/listings`,
            config
        );
        const properties = data.properties || data.data || data;

        dispatch(setProperties(properties));

    } catch (err) {
        console.error("Error fetching agent properties:", err);
        dispatch(setError(err.response?.data?.message || err.message));
    }

}
export const deleteProperty = (id) => async (dispatch, getState) => {
    try {

        const { auth } = getState();

        await axios.delete( `${apis[1]}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        );

        dispatch(removeProperty(id));

    } catch (error) {
        console.log(error);
    }
};

export const updateProperty = (id, updatedData) => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        const { data } = await axios.put(`${apis[1]}/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setProperty(data.property))
        const { properties } = getState().property;
        const newList = properties.map(p => p._id === id ? data.property : p);
        dispatch(setProperties(newList));

    } catch (err) {
        console.error(err.response?.data || err.message);
        dispatch(setError("Failed to update property"));
    }
};
