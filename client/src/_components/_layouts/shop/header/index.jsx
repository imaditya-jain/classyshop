import { Container, } from "@mui/material";
import Topbar from "./topbar";
import Header from "./top-header";
import Navigation from './navigation'

const index = () => {
  return (
    <>
      <header className="bg-white">
        <Container maxWidth="xl" className="!px-0">
          <Topbar />
          <Header />
          <Navigation />
        </Container>
      </header>
    </>
  );
};

export default index;
