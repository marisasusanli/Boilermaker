import React from 'react';
import { connect } from 'react-redux';
import { fetchPuppies } from '../redux/puppies';
import { Link } from 'react-router-dom';

class Puppies extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      filter: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await this.props.getPuppies();
    this.setState({
      loading: false,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    let allPuppies = this.props.puppies;

    return (
      <div>
        {this.state.loading && <div>Page Is Loading</div>}
        {/* <div>
          <h2 className='form'>Create New Robot:</h2>
          <div className='create-form'>
            <CreateRobot sendNewRobot={this.props.sendNewRobot} />
          </div>
        </div> */}
        <div>
          <h2>Current Puppies:</h2>
          <ul>
            {allPuppies.length
              ? allPuppies.map((pup) => <li key={pup.id}>Name:{pup.name}</li>)
              : 'There are no puppies registered in the database.'}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    puppies: state.puppies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPuppies: () => dispatch(fetchPuppies()),
    // sendNewRobot: (robot) => dispatch(sendNewRobot(robot)),
    // deleteOldRobot: (robotId) => dispatch(deleteOldRobot(robotId)),
  };
};

export default connect(mapState, mapDispatch)(Puppies);
