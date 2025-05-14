import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCampusThunk } from '../../store/thunks';
import { NewCampusView } from '../views';

class NewCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
      imageUrl: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const campus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl || 'https://via.placeholder.com/480x240?text=Campus',
    };
    await this.props.addCampus(campus);
  };

  render() {
    return (
      <div>
        <NewCampusView addCampus={this.props.addCampus} />
      </div>
    );
  }
}

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  };
};

export default connect(null, mapDispatch)(NewCampusContainer); 