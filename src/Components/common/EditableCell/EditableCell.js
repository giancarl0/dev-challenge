import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inEditableState: false,
      updatedValue: undefined,
      initialValue: this.props.value,
    };
  }

  render() {
    const { inEditableState, updatedValue, initialValue } = this.state;
    const { updateFunction, dataKey, dataId } = this.props;

    return (
      <div>
        <Grid container>
          <Grid item xs={8}>
            {inEditableState ? (
              <TextField
                value={updatedValue ?? initialValue}
                fullWidth={true}
                onChange={(e) => {
                  this.setState({ updatedValue: e.target.value });
                }}
              />
            ) : (
              <div className="text-wrapper">
                <span>{updatedValue ?? initialValue}</span>
              </div>
            )}
            <Grid />
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end">
              <Grid item>
                {inEditableState ? (
                  <>
                    <IconButton
                      color="primary"
                      component="span"
                      size="small"
                      onClick={() => {
                        const newValue =
                          updatedValue && updatedValue !== ''
                            ? updatedValue
                            : undefined;
                        newValue &&
                          updateFunction(dataId, { [dataKey]: newValue });
                        this.setState({
                          inEditableState: false,
                          initialValue: newValue ?? initialValue,
                          updatedValue: undefined,
                        });
                      }}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      component="span"
                      size="small"
                      onClick={() => {
                        this.setState({
                          inEditableState: false,
                          updatedValue: undefined,
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    color="primary"
                    component="span"
                    size="small"
                    onClick={() => {
                      this.setState({ inEditableState: true });
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditableCell.propTypes = {
  value: PropTypes.string,
  loading: PropTypes.bool,
  updateFunction: PropTypes.func,
  dataId: PropTypes.any,
  dataKey: PropTypes.string,
};

export default EditableCell;
