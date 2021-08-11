import * as React from "react";

class HomeContainer extends React.Component {
  render() {
    const ViewComponent = this.props.viewComponent;
    const {
      fipeStore: {
        requiredInfo,
        fipeResponses,
        setCategory,
        setBrand,
        setModel,
        setYear,
      },
      uiStore: { error, loading },
    } = this.props;
    const viewComponentProps = {
      requiredInfo,
      fipeResponses,
      setCategory,
      setBrand,
      setModel,
      setYear,
      error,
      loading,
    };

    return <ViewComponent {...viewComponentProps} />;
  }
}

export default HomeContainer;
