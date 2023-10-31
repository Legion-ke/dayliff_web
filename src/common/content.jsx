import { Typography, Breadcrumbs, Container } from "@mui/material";
import { CircularLoader, ErrorPage } from "ochom-react-components";
import { Link } from "react-router-dom";
import { PageBody, PageBodyContent, PageBodyHeader } from "./styled";
import { NavigateNext } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const NavLink = ({ to, title }) => (
  <Typography color="grey" variant="body2">
    <Link to={to}>{title}</Link>
  </Typography>
);

const TopBar = () => {
  return (
    <PageBodyHeader>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NavLink to="/dashboard" title="Dashboard" />
      </Breadcrumbs>
    </PageBodyHeader>
  );
};

// eslint-disable-next-line react/prop-types
export default function PageContent({ loading, error, children }) {
  return (
    <PageBody>
      <TopBar />

      <PageBodyContent>
        {loading ? (
          <CircularLoader />
        ) : error ? (
          <ErrorPage error={error} title="Oops!" />
        ) : (
          <Container>{children}</Container>
        )}
      </PageBodyContent>
    </PageBody>
  );
}
