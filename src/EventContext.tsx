import { useState, createContext, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'

export const EventContext = createContext<any>(null);

export const EventProvider = (props: { children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }) => {

    const [events, setEvents] = useState({ "data": [] });

    return (
        <EventContext.Provider value={[events, setEvents]}>
            {props.children}
        </EventContext.Provider>
    );
}