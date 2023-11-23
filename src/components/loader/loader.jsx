const Loader = () => {
  return (
    <div className="d-flex vh-100 bg-transparent align-items-center justify-content-center">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
