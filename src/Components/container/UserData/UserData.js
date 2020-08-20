import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import Button from '@material-ui/core/Button';

import { transformToLabel } from 'utils/utils';
import { userOperations } from 'redux/user';

import CollapsibleTable from 'Components/common/CollapsibleTable/CollapsibleTable';

import './user-data.css';

class UserData extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  generateCollapsibleTableData(userData) {
    return userData.map((currentUser) => {
      const { avatar, ...userData } = currentUser;
      return { ...userData, collapse_content: { avatar } };
    });
  }

  generateCsvLabel(userData) {
    return Object.keys(userData[0]).map((key) => {
      return { label: transformToLabel(key), key: key };
    });
  }

  render() {
    const { userData, updateUserData } = this.props;
    if (userData.length) {
      return (
        <div>
          <div id="table-container">
            <CollapsibleTable
              tableData={this.generateCollapsibleTableData(userData)}
              updateFunction={updateUserData}
            />
            <CSVLink
              data={userData}
              headers={this.generateCsvLabel(userData)}
              target="_blank"
              filename={`userdata.csv`}
              id="csv-link"
            >
              <Button variant="outlined">Download</Button>
            </CSVLink>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(userOperations.get_user_data()),
  updateUserData: (id, updates) =>
    dispatch(userOperations.update_user_data(id, updates)),
});

const mapStateToProps = (state) => {
  const { userData } = state.user;
  return {
    userData: userData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
