import './styles.css';
import React from 'react';
import UpdateUserDialog from "../../components/admin/UpdateUserDialog";

export default function Admin() {

    return (
        <main>
            <UpdateUserDialog />
            <h1>Admin</h1>
        </main>
    );
}