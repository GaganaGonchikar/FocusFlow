// import { useEffect, useState } from "react";
// import axios from "axios";

// type Event = {
//   event_id: string;
//   event_name: string;
//   event_date: string;
//   event_location: string;
//   event_description: string;
// };

// type ParticipationHistoryResponse = {
//   participation_history: Event[];
// };

// function ParticipationHistory() {
//   const [NTID, setNTID] = useState<string>("");
//   const [participationHistory, setParticipationHistory] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.get<ParticipationHistoryResponse>(`http://127.0.0.1:8000/participation-history/${NTID}`);
//       setParticipationHistory(data.participation_history);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Participation History</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           NTID:
//           <input type="text" value={NTID} onChange={(e) => setNTID(e.target.value)} />
//         </label>
//         <button type="submit">Fetch Participation History</button>
//       </form>
//       <ul>
//         {participationHistory.map((event) => (
//           <li key={event.event_id}>
//             <p>{event.event_id}</p>
//             <p>{event.event_name}</p>
//             <p>{event.event_date}</p>
//             <p>{event.event_location}</p>
//             <p>{event.event_description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ParticipationHistory;



// import { useState } from "react";
// import axios from "axios";
// import { DataGrid } from "devextreme-react/data-grid";
// import "devextreme/dist/css/dx.common.css";
// import "devextreme/dist/css/dx.light.css";
// import './ParticipationHistory.css';

// type Event = {
//   event_id: string;
//   event_name: string;
//   event_date: string;
//   event_location: string;
//   event_description: string;
// };

// type ParticipationHistoryResponse = {
//   participation_history: Event[];
// };

// function ParticipationHistory() {
//   const [NTID, setNTID] = useState<string>("");
//   const [participationHistory, setParticipationHistory] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.get<ParticipationHistoryResponse>(`http://127.0.0.1:8000/participation-history/${NTID}`);
//       setParticipationHistory(data.participation_history);
//       window.alert("Participation history fetched successfully.");
//     } catch (error) {
//       console.error(error);
//       window.alert("NTID is incorrect or user is not registered to any events.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     { dataField: "event_id", caption: "Event ID" },
//     { dataField: "event_name", caption: "Event Name" },
//     { dataField: "event_date", caption: "Event Date" },
//     { dataField: "event_location", caption: "Event Location" },
//     { dataField: "event_description", caption: "Event Description" },
//   ];

//   return (
//     <div>
//       <h1>Participation History</h1>
//       <form onSubmit={handleSubmit} className="ParticipationHistory-form">
//   <label>
//     NTID:
//     <input className="ParticipationHistory-input" type="text" value={NTID} onChange={(e) => setNTID(e.target.value)} />
//   </label>
//   <button className="ParticipationHistory-button" type="submit">Fetch Participation History</button>
// </form>
// <DataGrid dataSource={participationHistory} columns={columns} className="ParticipationHistory-datagrid" />

//     </div>
//   );
// }

// export default ParticipationHistory;


import { useState } from "react";
import axios from "axios";
import { DataGrid, Column, Paging } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./ParticipationHistory.css";
import { FilterRow, HeaderFilter, SearchPanel } from "devextreme-react/data-grid";

// import focusFlow from "./focusFlow.png";
// import boschlogo from "./boschlogo.png";

type Event = {
  event_id: string;
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
};

type ParticipationHistoryResponse = {
  participation_history: Event[];
};

function ParticipationHistory() {
  const [NTID, setNTID] = useState<string>("");
  const [participationHistory, setParticipationHistory] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get<ParticipationHistoryResponse>(
        `http://127.0.0.1:8000/participation-history/${NTID}`
      );
      setParticipationHistory(data.participation_history);
      window.alert("Participation history fetched successfully.");
    } catch (error) {
      console.error(error);
      window.alert(
        "NTID is incorrect or user is not registered to any events."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ParticipationHistory-container">
      {/* <img src={focusFlow} alt="Focus Flow logo" className="ParticipationHistory-logo-right" />
      <img src={boschlogo} alt="Bosch logo" className="ParticipationHistory-logo-left" /> */}
      <h2>PARTICIPATION HISTORY</h2>
      <form onSubmit={handleSubmit} className="ParticipationHistory-form">
      <input
  className="ParticipationHistory-input"
  type="text"
  value={NTID}
  onChange={(e) => setNTID(e.target.value)}
  placeholder="Enter your NTID"
/>

        <button className="ParticipationHistory-button" type="submit">
          Fetch Participation History
        </button>
      </form>
      {/* <DataGrid
        dataSource={participationHistory}
        className="ParticipationHistory-datagrid"
      >
        <Column dataField="event_id" caption="Event ID" />
        <Column dataField="event_name" caption="Event Name" />
        <Column dataField="event_date" caption="Event Date" />
        <Column dataField="event_location" caption="Event Location" />
        <Column dataField="event_description" caption="Event Description" />
        <Paging defaultPageSize={10} />
      </DataGrid> */}
      <DataGrid
  dataSource={participationHistory}
  className="ParticipationHistory-datagrid"
>
  <FilterRow visible={true} applyFilter="auto" />
  <HeaderFilter visible={true} />
  <SearchPanel visible={true} width={240} placeholder="Search..." />

  <Column dataField="event_id" caption="Event ID" />
  <Column dataField="event_name" caption="Event Name" />
  <Column dataField="event_date" caption="Event Date" />
  <Column dataField="event_location" caption="Event Location" />
  <Column dataField="event_description" caption="Event Description" />
  <Paging defaultPageSize={10} />
</DataGrid>

    </div>
  );
}

export default ParticipationHistory;



