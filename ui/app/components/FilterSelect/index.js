import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import PropTypes from 'prop-types';
import { TextField, MenuItem, Grid, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import clearIcon from '../../images/clear-icon.svg';
import pencilIcon from '../../images/pencil-icon.svg';
import searchIcon from '../../images/search-icon.svg';
import messages from './messages';

const styles = {
  select: {
    '&:hover': {
      backgroundColor: '#fff',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderRight: 'none',
    },
    '&:focus': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderRight: 'none',
    },
    backgroundColor: '#f6f7f8',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderRight: 'none',
  },
  searchValueContainer: {
    minWidth: '288px',
    borderBottom: '1px solid #4e4e4e',
    position: 'relative',
    bottom: '8px',
  },
  searchValueContainerWithoutHover: {
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#fff',
    },
    minWidth: '288px',
    borderBottom: '1px solid #4e4e4e',
    position: 'relative',
    bottom: '8px',
  },
  searchValueField: {
    width: '200px',
    paddingLeft: '5px',
    fontSize: '14px',
  },
  clearIconContainer: {
    display: 'inline',
    width: '100px',
  },
  clearIcon: {
    position: 'relative',
    top: '15px',
    left: '51px',
  },
  addValueButton: {
    width: '62px',
    height: '26px',
    top: '5px',
  },
  dataContainer: {
    display: 'inline',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  editValueIcon: {
    '&:hover': {
      filter: 'invert(1)',
    },
    position: 'relative',
    top: '2px',
    marginLeft: '10px',
  },
};

/* eslint-disable react/prefer-stateless-function */
export class FilterSelect extends React.Component {
  state = {
    valuesDropdownOpen: false,
    filterInput: '',
    filteringValues: false,
    buttonHovered: false,
  };

  render() {
    const { classes, intl } = this.props;
    return (
      <TextField
        select
        value={this.props.value || 'select'}
        label={
          this.props.inputLabelMessage
            ? intl.formatMessage(this.props.inputLabelMessage)
            : null
        }
        onClick={() => {
          this.setState({
            valuesDropdownOpen: !this.state.valuesDropdownOpen,
          });
        }}
        onChange={evt => {
          this.setState({
            valuesDropdownOpen: false,
          });
          if (
            ['filter', 'create', 'no results'].indexOf(evt.target.value) === -1
          ) {
            if (
              !evt._targetInst ||
              (evt._targetInst && evt._targetInst.type !== 'img')
            ) {
              this.setState({
                filteringValues: false,
                filterInput: '',
              });
              this.props.onSelect(evt.target.value);
            }
          }
        }}
        margin="normal"
        fullWidth
        inputProps={{
          className: classes.select,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={this.props.helperText}
        error={this.props.error}
        SelectProps={this.props.SelectProps ? this.props.SelectProps : {}}
        style={this.props.style}
      >
        {this.props.value || this.state.valuesDropdownOpen ? null : (
          <MenuItem key="select" value="select">
            <FormattedMessage {...messages.selectDefault} />
          </MenuItem>
        )}
        <MenuItem
          className={
            this.state.buttonHovered
              ? classes.searchValueContainerWithoutHover
              : classes.searchValueContainer
          }
          value="filter"
        >
          <Grid
            container
            justify={this.props.hideAddButton ? 'flex-start' : 'flex-end'}
            style={this.state.filterInput ? { position: 'absolute' } : {}}
          >
            <img src={searchIcon} />
            <Input
              inputProps={{
                style: {
                  border: 'none',
                },
              }}
              value={this.state.filterInput}
              onClick={evt => {
                evt.stopPropagation();
                return 0;
              }}
              disableUnderline
              className={classes.searchValueField}
              onChange={evt => {
                this.setState({
                  filteringValues: evt.target.value.length > 0,
                  filterInput: evt.target.value,
                });
                this.props.onSearch(evt.target.value);
              }}
            />
            {this.state.filteringValues ? (
              <div className={classes.clearIconContainer}>
                <img
                  onClick={evt => {
                    evt.stopPropagation();
                    this.props.onSearch('');
                    this.setState({
                      filteringValues: false,
                      filterInput: '',
                    });
                    return 0;
                  }}
                  className={classes.clearIcon}
                  src={clearIcon}
                />
              </div>
            ) : this.props.hideAddButton ? null : (
              <Button
                onClick={() => {
                  this.props.onGoToUrl(this.props.onCreateRoute);
                }}
                className={classes.addValueButton}
                variant="contained"
                onMouseEnter={() => {
                  this.setState({ buttonHovered: true });
                }}
                onMouseLeave={() => {
                  this.setState({ buttonHovered: false });
                }}
              >
                <FormattedMessage {...messages.add} />
              </Button>
            )}
          </Grid>
        </MenuItem>
        {this.state.filteringValues
          ? this.props.filteredValues.length > 0
            ? this.props.filteredValues.map((filteredValue, index) => (
                <MenuItem
                  key={`filteredValue_${index}`}
                  value={filteredValue[this.props.valueField]}
                >
                  <Grid container justify="space-between">
                    <div className={classes.dataContainer}>
                      <span>{filteredValue[this.props.valueDisplayField]}</span>
                    </div>
                    {filteredValue[this.props.valueField] ===
                      this.props.value &&
                    !this.state.valuesDropdownOpen ? null : (
                      <div className={classes.dataContainer}>
                        {this.props.displayThreshold ? (
                          <span>
                            {filteredValue[this.props.thresholdField] * 100}%
                          </span>
                        ) : null}
                        {this.props.displayEdit ? (
                          <img
                            id={`edit_value_${
                              filteredValue[this.props.valueField]
                            }`}
                            onClick={() => {
                              this.props.onGoToUrl({
                                url: `${this.props.onEditRoutePrefix}${
                                  filteredValue.id
                                }`,
                                isEdit: true,
                              });
                            }}
                            className={classes.editValueIcon}
                            src={pencilIcon}
                          />
                        ) : null}
                      </div>
                    )}
                  </Grid>
                </MenuItem>
              ))
            : [
                <MenuItem key="no results" value="no results">
                  <FormattedMessage {...messages.noResults} />
                </MenuItem>,
                this.props.hideAddButton ? null : (
                  <MenuItem key="create" value="create">
                    <Button
                      onClick={() => {
                        this.props.onGoToUrl(this.props.onCreateRoute);
                      }}
                      className={classes.addValueButton}
                      variant="contained"
                      onMouseEnter={() => {
                        this.setState({ buttonHovered: true });
                      }}
                      onMouseLeave={() => {
                        this.setState({ buttonHovered: false });
                      }}
                    >
                      <FormattedMessage {...messages.add} />
                    </Button>
                  </MenuItem>
                ),
              ]
          : this.props.values.map((value, index) => (
              <MenuItem
                key={`value_${index}`}
                value={value[this.props.valueField]}
              >
                <Grid container justify="space-between">
                  <div className={classes.dataContainer}>
                    <span>{value[this.props.valueDisplayField]}</span>
                  </div>
                  {value[this.props.valueField] === this.props.value &&
                  !this.state.valuesDropdownOpen ? null : (
                    <div className={classes.dataContainer}>
                      {this.props.displayThreshold ? (
                        <span>{value[this.props.thresholdField] * 100}%</span>
                      ) : null}
                      {this.props.displayEdit ? (
                        <img
                          id={`edit_value_${value[this.props.valueField]}`}
                          onClick={() => {
                            this.props.onGoToUrl({
                              url: `${this.props.onEditRoutePrefix}${value.id}`,
                              isEdit: true,
                            });
                          }}
                          className={classes.editValueIcon}
                          src={pencilIcon}
                        />
                      ) : null}
                    </div>
                  )}
                </Grid>
              </MenuItem>
            ))}
      </TextField>
    );
  }
}

FilterSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  onGoToUrl: PropTypes.func,
  onEditRoutePrefix: PropTypes.string,
  onCreateRoute: PropTypes.string,
  filteredValues: PropTypes.array,
  values: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueDisplayField: PropTypes.string,
  valueField: PropTypes.string,
  thresholdField: PropTypes.string,
  inputLabelMessage: PropTypes.object,
  displayThreshold: PropTypes.bool,
  displayEdit: PropTypes.bool,
  SelectProps: PropTypes.object,
  style: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  hideAddButton: PropTypes.bool,
};

export default injectIntl(withStyles(styles)(FilterSelect));
