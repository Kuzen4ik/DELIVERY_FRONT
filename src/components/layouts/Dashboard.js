import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  flex-direction: column;

  .items {
    margin-top: 50px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .menuItem {
    padding: 5px 10px;
    border-left: 2px solid #2f2fba;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .menuItem:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .content {
    flex-grow: 1;
    padding-bottom: 40px;
  }
`;

const MENU_ITEMS = [
  {
    title: "Shop",
    href: "/",
  },
  {
    title: "Shopping cart",
    href: "/shopping-cart",
  },
  {
    title: "History",
    href: "/history",
  },
  {
    title: "Coupons",
    href: "/coupons",
  },
];

const Dashboard = ({ children }) => {
  return (
    <Wrapper>
      <div className="items">
        {MENU_ITEMS.map((item, index) => (
          <Link
            key={item.title}
            className="menuItem"
            style={{ borderWidth: !!index ? 2 : 0 }}
            to={item.href}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="content">{children}</div>
    </Wrapper>
  );
};

export default Dashboard;
