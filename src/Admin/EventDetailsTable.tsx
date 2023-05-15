import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, Column, Editing, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './Table.css';
import Header from './../Header';
import Navigation from './navigation';

type EventDetails = {
  event_id: string;
  event_name: string;
  event_location: string;
  event_description: string;
  event_date: string;
  type_of_event: string;
};

const EventDetailsTable = () => {
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

  const handleEditEnabled = () => {
    setEditingEnabled(!editingEnabled);
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

  const handleRowUpdating = async (e: any) => {
    const updatedEvent = { ...e.oldData, ...e.newData };
    try {
      const queryParams = new URLSearchParams({
        event_id: updatedEvent.event_id,
        event_name: updatedEvent.event_name,
        event_location: updatedEvent.event_location,
        event_description: updatedEvent.event_description,
        event_date: updatedEvent.event_date,
        type_of_event: updatedEvent.type_of_event,
      }).toString();

      await axios.put(`http://127.0.0.1:8000/update-event-details/${updatedEvent.event_id}?${queryParams}`);
      alert('Event details updated successfully');
    } catch (error) {
      alert('Could not update user details');
    }
  };

  const handleRowRemoving = async (e: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-event/${e.data.event_id}`);
      setEventDetails((prevEventDetails) =>
        prevEventDetails.filter((event) => event.event_id !== e.data.event_id)
      );
      alert('Event deleted successfully');
    } catch (error) {
      alert('Could not delete event');
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFilterQuery(selectedOptions);
  };

  const filteredEventDetails = eventDetails.filter((event) => {
    const isMatch = searchEvent(event, searchQuery);
    const isCategoryMatch = filterQuery.length === 0 || filterQuery.includes(event.type_of_event);
    return isMatch && isCategoryMatch;
  });

  const uniqueTypes = Array.from(new Set(eventDetails.map((event) => event.type_of_event)));
  
  return (
    <div><Header title="MANAGE EVENTS" />
    <Navigation /> 
    <div className="container">
      <div className="search-form">
  <label htmlFor="search-input">Search:</label>
  <input
    id="search-input"
    type="text"
    value={searchQuery}
    onChange={handleSearch}
    placeholder="Search by NTID/First Name/Last Name/Email or Location"
  />
  <label htmlFor="filter-select">Filter by Type:</label>
<select id="filter-select" value={filterQuery} onChange={handleFilter} multiple>
  <option value="">All</option>
  {uniqueTypes.map(type => (
    <option key={type} value={type}>{type}</option>
  ))}
</select>


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
        onRowUpdating={handleRowUpdating}
        onRowRemoving={handleRowRemoving}  
      >
      <Editing
        mode={editingEnabled ? 'row' : 'none'}
        allowUpdating={true}
        allowDeleting={true}
        useIcons={true}
      />
      <Paging enabled={true} pageSize={10}  />
      <Column dataField="event_id" caption="ID"  />
      <Column dataField="event_name" caption="Name" />
      <Column dataField="event_location" caption="Location" />
      <Column dataField="event_description" caption="Description" />
      <Column dataField="event_date" caption="Date" />
      <Column dataField="type_of_event" caption="Category" />
      </DataGrid>
  </div>
  </div>
 );
};

export default EventDetailsTable;
