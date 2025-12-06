import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="spinner"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  