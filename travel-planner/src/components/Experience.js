import React, { Component } from 'react';
import './experience.css';

class Experience extends Component {
    constructor(props) {
        super(props);

        // State initialization
        this.state = {
          message: 'An-Experience!',
        };
    }

    render() {
        return (
          <div className='experience'>
            <h1>{this.state.message}</h1>
          </div>
        );
      }
}

export default Experience;
