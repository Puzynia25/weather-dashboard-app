const Spinner = () => {
    return (
        <div className="h-100 d-flex align-items-center">
            <div className=" spinner-border mx-auto " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
