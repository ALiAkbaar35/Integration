import "../../App.css";
import {
    AppstoreOutlined,
    DesktopOutlined,
    ContactsOutlined,
} from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const createItem = (label, key, icon, children, type) => ({
    key,
    icon,
    children,
    label,
    type,
});

const items = [
    createItem("Dashboard", "/", <DesktopOutlined />),

    createItem("Tables", "Tables", <AppstoreOutlined />, [
        createItem("Contract", "Contract", <ContactsOutlined />),
    ]),
];

const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const renderMenuItems = (items) => {
        return items.map((item) =>
            item.children ? (
                <AntMenu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                >
                    {renderMenuItems(item.children)}
                </AntMenu.SubMenu>
            ) : (
                <AntMenu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => navigate(item.key)}
                >
                    {item.label}
                </AntMenu.Item>
            )
        );
    };

    return (
        <div>
            <p className="title pl-7 mb-5 font-bold text-white mt-5">
                {user.name}
            </p>
            <div>
                <AntMenu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    theme="dark"
                >
                    {renderMenuItems(items)}
                </AntMenu>
            </div>
        </div>
    );
};

export default Sidebar;
