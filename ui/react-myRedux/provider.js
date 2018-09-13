import React from 'react';
import PropTypes from 'prop-types'

export default class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.element,
};

Provider.childContextTypes = {
  store: PropTypes.object,
};
