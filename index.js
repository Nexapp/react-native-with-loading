import React, { Fragment } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { InteractionManager } from 'react-native';

export default function withLoading(WrappedComponent) {
  class Component extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        componentVisible: false,
      };
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({ componentVisible: true });
      });
    }

    onComponentLoaded = () => {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
    }

    render() {
      return (
        <Fragment>
          <Spinner visible={this.state.loading} />

          {this.state.componentVisible &&
            <WrappedComponent
              {...this.props}
              isMounted={!this.state.loading}
              onComponentLoaded={this.onComponentLoaded}
            />
          }
        </Fragment>
      );
    }
  }

  return Component;
}
