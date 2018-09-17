import React from 'react';
import PropTypes from 'prop-types'

const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({}),
) => (Component) => {
  class Connected extends React.Component {
    update = (props) => {
      const { store } = this.context;
      const state = store.getState();
      const stateProps = mapStateToProps(state, props);
      const dispatchProps = mapDispatchToProps(store.dispatch, props);
      this.setState({
        ...stateProps,
        ...dispatchProps,
      });
    }

    componentWillMount() {
      const { store } = this.context;
      this.update(this.props);
      this.unsubscribe = store.subscribe(() => this.update(this.props));
    }

    componentWillReceiveProps(nextProps) {
      this.update(nextProps);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  }

  Connected.contextTypes = {
    store: PropTypes.object,
  };

  return Connected;
};

export default connect
