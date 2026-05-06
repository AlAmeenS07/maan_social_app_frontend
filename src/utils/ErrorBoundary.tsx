import React, { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Global Error:", error, errorInfo);

    // 👉 optional: send to backend / Sentry here
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong !
          </h1>

          <p className="text-gray-600 mb-4">
            {this.state.error?.message || "Unexpected error occurred"}
          </p>

          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;