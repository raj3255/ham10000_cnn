function Overview() {
  return (
    <div className="container py-5">
      <header className="mb-5 text-center">
        <h1 style={{color:'red'}}>Welcome to SkinCare AI</h1>
        <p className="lead" >
          Our AI-powered tool helps you understand skin conditions quickly and accurately.
        </p>
      </header>

      <section className="">
        <h2 style={{color:'red'}}>How It Works</h2>
        <p>
          1. Upload a clear skin image.<br />
          2. Our model analyzes the image.<br />
          3. Get a detailed report with possible conditions and next steps.
        </p>
      </section>

      <section className="mb-5">
        <h2 style={{color:'red'}}>Why Choose Us</h2>
        <ul>
          <p>Fast results — Just upload and go.</p>
          <p>Research-backed models built from trusted datasets.</p>
          <p>Secure and private — your data stays with you.</p>
        </ul>
      </section>

      <section className="mb-5">
        <h2 style={{color:'red'}}>Getting Started</h2>
        <p>
          Sign up or log in to get started. Once you're in, upload your image to begin the analysis.
        </p>
      </section>
    </div>
  );
}

export default Overview;
