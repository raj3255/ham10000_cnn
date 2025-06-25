import Header from '../Header';
import Footer from '../Footer';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
