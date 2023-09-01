import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here or perform other actions

    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom error UI here

      return (
        <h1 style={{ color: "red", textAlign: "center" }}>
          Desværre, appen kan ikke indlæses :/
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
