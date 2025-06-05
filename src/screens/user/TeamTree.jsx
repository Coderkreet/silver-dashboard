import { useEffect, useState } from "react";
import { getUserTreeData } from "../../api/user-api";
import PageLoader from "../../components/ui/PageLoader";
import "../../styles/TeamTree.css";
import { maskEmail } from "../../utils/additionalFunc";

const TeamTree = () => {
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [downlineCount, setDownlineCount] = useState(0);

  const fetchTreeData = async () => {
    try {
      setLoading(true);
      const info = await getUserTreeData();
      setTreeData(info?.downlineTree);
      setDownlineCount(info?.downlineLengthTree);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const Person = ({ person }) => (
    <div className="person">
      <img
        src={
          "https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-128.png"
        }
        alt={person?.username}
      />
      <p className="name">{person?.username}</p>
      <div className="info-box">
        <p className="mt-2">
          <strong>Username:</strong> {person?.username || "Unknown Username"}
        </p>
        <p className="mt-2">
          <strong>Email:</strong> {maskEmail(person?.email) || "Unknown email"}
        </p>
        <p className="mt-2">
          <strong>Status:</strong> {person?.isActive ? "Active" : "Inactive"}
        </p>
        <p className="mt-2">
          <strong>Investment:</strong>{" "}
          {person?.investment || "Unknown investment"}
        </p>
      </div>
    </div>
  );

  const ManagementTree = ({ data }) => {
    return (
      <div className="mgt-item">
        <div className="mgt-item-parent">
          <Person person={data} />
        </div>
        {data?.partners && data?.partners?.length > 0 && (
          <div className="mgt-item-children">
            {data?.partners?.map((child, index) => (
              <div className="mgt-item-child" key={index}>
                <ManagementTree data={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="TeamTree">
        <div className="ss-card fs-2 fw-bold " style={{ width: "fit-content" }}>
          Downline Count : {downlineCount}
        </div>
        <div className="management-tree">
          <div className="mgt-container">
            <div className="mgt-wrapper">
              <ManagementTree data={treeData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamTree;
