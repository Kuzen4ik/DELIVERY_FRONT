import { useCallback, useEffect, useState } from "react";
import { deleteAdminsAPI, getAdminsAPI } from "../../api/api";
import DeleteButton from "../../components/UI/DeleteButton";

const Admins = () => {
  const [admins, setAdmins] = useState(null);
  const [isUpdateAdmins, setIsUpdateAdmins] = useState(false);

  const getAdmins = useCallback(async () => {
    try {
      const { data } = await getAdminsAPI();
      setAdmins(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteAdmin = useCallback(async (admin) => {
    const res = window.confirm(`Remove ${admin.email}?`);
    if (!res) {
      return;
    }
    try {
      await deleteAdminsAPI(admin.id);
      setIsUpdateAdmins((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getAdmins();
  }, [isUpdateAdmins]);

  if (!admins) {
    return null;
  }

  return (
    <div>
      <ul>
        {admins.map((admin) => (
          <li
            key={admin.id}
            style={{
              width: 300,
              margin: 10,
            }}
          >
            {admin.email}{" "}
            <button
              type="button"
              style={{ cursor: "pointer" }}
              onClick={() => deleteAdmin(admin)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admins;
