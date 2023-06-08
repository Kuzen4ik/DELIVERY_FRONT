import styled from "@emotion/styled";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Button } from "@mui/material";

const DashboardWrapper = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  flex-direction: column;

  .items {
    margin-top: 50px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
  }

  .menuItem {
    padding: 5px 10px;
    border-left: 2px solid #2f2fba;
    position: relative;
    cursor: pointer;

    a {
      color: black;
      text-decoration: none;
    }

    .menuItemCount {
      position: absolute;
      top: 0;
      right: 1.5px;
      width: 12px;
      height: 12px;
      border-radius: 10px;
      background: #2f2fba;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        margin: 0;
        font-size: 8px;
        color: white;
      }
    }
  }

  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50);
    right: 30px;
  }
  .menuItem:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .content {
    flex-grow: 1;
    padding-bottom: 40px;
  }
`;

const Dashboard = ({ children }) => {
  const { shoppingCart, isAdmin, setIsAdmin } = useContext(GlobalContext);

  const menuItems = useMemo(() => {
    const items = [
      {
        title: "Shop",
        href: "/",
      },
      {
        title: "Shopping cart",
        href: "/shopping-cart",
        count: shoppingCart?.foods.length,
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

    return items;
  }, [shoppingCart]);

  return (
    <DashboardWrapper>
      <div className="items">
        {menuItems?.map((item) => (
          <div key={item.title} className="menuItem">
            <Link to={item.href}>{item.title}</Link>
            {item.count ? (
              <div className="menuItemCount">
                <p>{item.count}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
        <Button
          className="btn"
          type="button"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {isAdmin ? "Admin" : "User"}
        </Button>
      </div>

      <div className="content">{children}</div>
    </DashboardWrapper>
  );
};

export default Dashboard;
