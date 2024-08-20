import "./styles.css";
import React, { useEffect, useState } from "react";
import UpdateUserDialog from "../../components/admin/UpdateUserDialog";
import { getAllUsers } from "../../utils/http";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Forbidden from "../errorPages/Forbidden";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        const userRole = Cookies.get("role");

        if (userRole !== "ROLE_ADMIN") {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
            getAllUsers(token).then(setUsers)
                .catch((error) => setError({ message: error.message || "An error occurred" }));
        }
    }, [navigate]);

    function handleChangeUser(user) {
        setSelectedUser(user);
        setIsUpdateUserDialogOpen(true);
    }

    function handleSort(key) {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = null;
            key = null;
        }
        setSortConfig({ key, direction });
    }

    const sortedUsers = React.useMemo(() => {
        if (sortConfig.key) {
            return [...users].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return users;
    }, [users, sortConfig]);

    if (!isAdmin) return <Forbidden />;

    return (
        <main>
            <UpdateUserDialog isOpen={isUpdateUserDialogOpen}
                              onClose={() => setIsUpdateUserDialogOpen(false)}
                              onChange={(updatedUser) => setUsers((prevUsers) => {
                                  return prevUsers.map(tempUser =>
                                      tempUser.id === updatedUser.id ? updatedUser : tempUser
                                  );
                              })}
                              user={selectedUser}/>
            <div className="gradiant-violet ">
                <div className="section-admin">
                    <div className="server-maintenance">
                        <h2>Server status:</h2>
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                        <div className="table-div">
                            <table>
                                <thead>
                                <tr>
                                    <th onClick={() => handleSort('id')} className={`th4 ${sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Id</th>
                                    <th onClick={() => handleSort('nickname')} className={`th1 ${sortConfig.key === 'nickname' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Nickname</th>
                                    <th onClick={() => handleSort('username')} className={`th2 ${sortConfig.key === 'username' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Username</th>
                                    <th onClick={() => handleSort('email')} className={`th3 ${sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Email</th>
                                    <th onClick={() => handleSort('achievements')} className={`th5 ${sortConfig.key === 'achievements' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Achv</th>
                                    <th onClick={() => handleSort('elo')} className={`th6 ${sortConfig.key === 'elo' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Elo</th>
                                    <th onClick={() => handleSort('matchesPlayed')} className={`th7 ${sortConfig.key === 'matchesPlayed' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Games</th>
                                    <th onClick={() => handleSort('matchesWon')} className={`th8 ${sortConfig.key === 'matchesWon' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Wins</th>
                                    <th onClick={() => handleSort('averagePlacement')} className={`th9 ${sortConfig.key === 'averagePlacement' ? (sortConfig.direction === 'ascending' ? 'sort-up' : 'sort-down') : ''}`}>Average</th>
                                    <th className="th10">Change</th>
                                </tr>
                                </thead>
                                <tbody>
                                {!error && sortedUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            <Link to={`/profile/${user.nickname}`} className="td-a">
                                                {user.nickname}
                                            </Link>
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.achievements}</td>
                                        <td>{user.elo}</td>
                                        <td>{user.matchesPlayed}</td>
                                        <td>{user.matchesWon}</td>
                                        <td>{user.averagePlacement}</td>
                                        <td onClick={() => handleChangeUser(user)} className="td-change">Change</td>
                                    </tr>
                                ))}
                                {error && (
                                    <tr>
                                        <td colSpan={10}>{error.message}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}