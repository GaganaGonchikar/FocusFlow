import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, Column, Editing, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
// import focusFlow from './focusFlow.png';
// import boschlogo from './boschlogo.png';

type EventDetails = {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
  type_of_event: string;
};

const eventlist = () => {
  const [eventDetails, setEventDetails] = useState<EventDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEnabled, setEditingEnabled] = useState(false);
  const [filterQuery, setFilterQuery] = useState<string[]>([]);

  useEffect(() => {
    axios.get<EventDetails[]>('http://127.0.0.1:8000/event-data').then((response) => {
      setEventDetails(response.data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const searchEvent = (event: EventDetails, query: string) => {
    return (
      event.event_id.toLowerCase().includes(query.toLowerCase()) ||
      event.event_name.toLowerCase().includes(query.toLowerCase()) ||
      event.event_location.toLowerCase().includes(query.toLowerCase()) ||
      event.event_description.toLowerCase().includes(query.toLowerCase()) ||
      event.event_date.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFilterQuery(selectedOptions);
  };


  const handleRegister = (event_id: string) => {
    const ntid = prompt('Enter NTID:');
    if (ntid) {
      const url = `http://127.0.0.1:8000/register-event?event_id=${event_id}&NTID=${ntid}`;
      axios
        .post(url)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.detail);
        });
    }
  };

  const RegisterButton = ({ data }: { data: EventDetails }) => {
    return <button onClick={() => handleRegister(data.event_id)}>Register</button>;
  };
  const [filters, setFilters] = useState<string[]>([]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((filter) => filter !== value));
    }
  };
  
  const filteredEventDetails = eventDetails.filter((event) => {
    const isMatch = searchEvent(event, searchQuery);
    const isCategoryMatch = filters.length === 0 || filters.includes(event.type_of_event);
    return isMatch && isCategoryMatch;
  });
  
  const uniqueTypes = Array.from(new Set(eventDetails.map((event) => event.type_of_event)));
  return (
    <div className="container">
      <div className="logo-container">
        {/* <img src={boschlogo} alt="Bosch logo" className="logo" /> */}
        <h1 className="title">EVENT LIST</h1>
        {/* <img src={focusFlow} alt="Focus Flow logo" className="logo" /> */}
      </div>
      <div className="search-form">
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by NTID/First Name/Last Name/Email or Location"
        />
  <div className="filter-form">
    <label htmlFor="filter-select">Filter by Type:</label>
    {uniqueTypes.map((type) => (
      <div key={type}>
        <input
          type="checkbox"
          id={type}
          value={type}
          onChange={handleFilterChange}
          checked={filters.includes(type)}
        />
        <label htmlFor={type}>{type}</label>
      </div>
    ))}
  </div>

</div>

<DataGrid
  dataSource={filteredEventDetails}
  showBorders={true}
  allowColumnResizing={true}
  allowColumnReordering={true}
  rowAlternationEnabled={true}
  hoverStateEnabled={true}
  remoteOperations={true}
  keyExpr="event_id"
  wordWrapEnabled={true}
>

  <Paging enabled={true} pageSize={10} />
  <Column dataField="event_id" caption="ID" />
  <Column dataField="event_name" caption="Name" />
  <Column dataField="event_location" caption="Location" />
  <Column dataField="event_description" caption="Description" />
  <Column dataField="event_date" caption="Date" />
  <Column dataField="type_of_event" caption="Category" />
  <Editing
    mode="form"
    allowUpdating={editingEnabled}
    allowDeleting={editingEnabled}
    allowAdding={editingEnabled}
    useIcons={true}
  />
  <Column
    caption="Register"
    type="buttons"
    width={110}
    buttons={[
      {
        hint: 'Register',
        icon: 'add',
        visible: true,
        onClick: (e: any) => handleRegister(e.row.data.event_id),
      },
    ]}
  />
</DataGrid>

  </div>
 );
};

export default eventlist;
