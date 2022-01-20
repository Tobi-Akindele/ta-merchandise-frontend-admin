import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUsers } from '../../redux/apiCalls';
import { format } from 'timeago.js';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const authUser = useSelector((state) => state.user.currentUser);
  const handleDelete = (id) => {
    deleteUsers(dispatch, id);
  };

  useEffect(() => {
    getUsers(dispatch, authUser);
  }, [dispatch, authUser]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img
              className='userListImg'
              src={
                params.row.image ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=''
            />
            {params.row.firstName} {params.row.lastName}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Joined',
      width: 160,
      renderCell: (params) => {
        return <span>{format(params.row.createdAt)}</span>;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/user/' + params.row.id}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='userListDelete'
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='userList'>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
