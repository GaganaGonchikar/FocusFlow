import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, Column, Editing, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './UserDetailsTable.css';
import focusFlow from "./focusFlow.png";
import boschlogo from "./boschlogo.png";

type User = {
  NTID: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  approved: boolean;
};

const UserDetailsTable = () => {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnapproved, setShowUnapproved] = useState(false);
  const [editingEnabled, setEditingEnabled] = useState(false);

  useEffect(() => {
    axios.get<User[]>('http://127.0.0.1:8000/user-data/').then(response => {
      setUserDetails(response.data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowUnapproved(event.target.checked);
  };

  const handleEditEnabled = () => {
    setEditingEnabled(prev => !prev);
  };

  const searchUser = (user: User, query: string) => {
    return (
      user.NTID.toLowerCase().includes(query.toLowerCase()) ||
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.last_name.toLowerCase().includes(query.toLowerCase()) ||
      user.location.toLowerCase().includes(query.toLowerCase()) ||
      user.phone.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredUserDetails = userDetails.filter(
    user => searchUser(user, searchQuery) && (showUnapproved ? !user.approved : true)
  );

  const handleRowUpdating = async (e: any) => {
    const updatedUser = { ...e.oldData, ...e.newData };
    try {
      const queryParams = new URLSearchParams({
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        approved: updatedUser.approved.toString(),
      });
      await axios.put(`http://127.0.0.1:8000/update-user-details/${updatedUser.NTID}?${queryParams}`);
      alert('User details updated successfully');
    } catch (error) {
      alert('Could not update user details');
    }
  };

  const handleRowRemoving = async (e: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-user/${e.data.NTID}`);
      setUserDetails(prevUsers => prevUsers.filter(user => user.NTID !== e.data.NTID));
      alert('User deleted successfully');
    } catch (error) {
      alert('Could not delete User');
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
      <img src={boschlogo} alt="Bosch logo" className="logo" />
      <h1 className="title">MANAGE USERS</h1>
      <img src={focusFlow} alt="Focus Flow logo" className="logo" />
      </div>

      <div className="search-form">
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by NTID, First Name, Last Name,Email or Location"
        />
        <label>
        <input
          type="checkbox"
          checked={showUnapproved}
          onChange={handleCheckboxChange}
          />
          Show Unapproved Users
        </label>
        </div>
          <DataGrid
            dataSource={filteredUserDetails}
            showBorders={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            remoteOperations={true}
            keyExpr="NTID"
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
          <Paging enabled={true} pageSize={10} />
          <Column dataField="NTID" caption="NTID" width={120} />
          <Column dataField="first_name" caption="First Name" width={150} />
          <Column dataField="last_name" caption="Last Name" width={150} />
          <Column dataField="email" caption="Email" width={200} />
          <Column dataField="phone" caption="Phone" width={150} />
          <Column dataField="location" caption="Location" width={150} />
          <Column
          dataField="approved"
          caption="Approved"
          width={100}
          dataType="boolean"
       />
    </DataGrid>
  </div>
);
};
          
export default UserDetailsTable;
