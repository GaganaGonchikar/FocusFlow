import react, { createContext, useState } from 'react'

export const UpdateEventContext = createContext<any>(null);

export function UpdateEventtContextProvider(props: { children: string | number | boolean | react.ReactFragment | react.ReactPortal | react.ReactElement<any, string | react.JSXElementConstructor<any>> | null | undefined; }) {

    const [updateEventInfo, setUpdateEventInfo] = useState({
        EventName: "",
        No_of_registered_users: 0,
        Attendees: 0,
        Date: 0,
        Time: 0,
        NtId: ""
    });

    return (
        <UpdateEventContext.Provider value={[updateEventInfo, setUpdateEventInfo]}>
            {props.children}
        </UpdateEventContext.Provider>
    );
}