import react, { useState, useContext, createContext } from 'react'


export const EventContext = createContext<any>(null);

export function AdminContextProvider(props: { children: string | number | boolean | react.ReactElement<any, string | react.JSXElementConstructor<any>> | react.ReactFragment | react.ReactPortal | null | undefined; }): JSX.Element {
    const [adminDetail, setAdminDetail] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        id: "",
        emailTitle: "",
        email_msg: ""
    });

    return (
        <AdminContext.Provider value={[adminDetail, setAdminDetail]}>
            {props.children}
        </AdminContext.Provider>
    );
}