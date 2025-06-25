import Footer from '../Footer';

function MinimalLayout({ children }) {
  return (
    <>
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </>
  );
}

export default MinimalLayout;
