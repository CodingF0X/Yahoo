import {
  Box,
  Button,
  Divider,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AccountBox, Delete, FileCopy, Security } from "@mui/icons-material";
import {
  deleteUser,
  getAllPostsAdmin,
  getAllUsersAdmin,
  toggleModerator,
} from "../../State/Action-Creators/AdminActions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { allUsers, allPosts } = admin;

  let countModerators = [];
  let countAdmins = [];

  allUsers.map((user) => {
    if (user.isModerator) {
      countModerators.push(user);
    }

    if (user.isAdmin) {
      countAdmins.push(user);
    }
  });

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleToggleModerator = (id, isModerator) => {
    dispatch(toggleModerator(id, !isModerator));
  };

  const handleVisitProfile = (id)=>{

  }

  useEffect(() => {
    dispatch(getAllUsersAdmin());
    dispatch(getAllPostsAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "isAdmin", type: "boolean", width: 100 },
    { field: "isModerator", type: "boolean", width: 100 },
    { field: "location", headerName: "Location", width: 130 },
    { field: "createdAt", headerName: "Joined in", width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDeleteUser(params.row._id)}
        />,
        <GridActionsCellItem
          icon={<Security />}
          label="Toggle Moderator"
          onClick={() =>
            handleToggleModerator(params.row._id, params.row.isModerator)
          }
          showInMenu
        />,
        <GridActionsCellItem
          icon={<AccountBox />}
          label="Visit Profile"
          onClick={()=>navigate(`/profile/${params.row._id}`)}
          showInMenu
        />,
      ],
    },
  ];

  const rows = allUsers?.map((doc, index) => ({
    id: index + 1,
    _id: doc._id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    age: doc.age,
    isAdmin: doc.isAdmin,
    isModerator: doc.isModerator,
    createdAt: new Date(doc.createdAt).toLocaleDateString("en-GB"),
  }));
  const [searchValue, setSearchValue] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const filteredRows = rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredRows(filteredRows);
  };

  return (
    <Box display={"flex"}>
      <Box flexBasis="30%">
        <Paper elevation={2} sx={{ ml: "5px", mr: "10px" }}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ pb: "20px" }}
          >
            <TextField
              placeholder="Search users"
              value={searchValue}
              onChange={handleSearchInputChange}
              sx={{
                maxWidth: "50%",
                alignSelf: "center",
                mt: "20px",
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearchButtonClick}
              sx={{
                maxWidth: "50%",
                alignSelf: "center",
                mt: "20px",
                ml: "20px",
              }}
            >
              Search
            </Button>
          </Box>

          <Typography variant="h5">
            Total Number of active users : {allUsers.length}
          </Typography>
          <Typography variant="h5">
            Total Number of active moderators : {countModerators.length}
          </Typography>

          <Typography variant="h5">
            Total Number of active Admins : {countAdmins.length}
          </Typography>
          <br></br>
          <Divider />
          <br></br>

          <Typography variant="h5" sx={{ pb: "20px" }}>
            Total Number of Posts : {allPosts.length}
          </Typography>
        </Paper>
      </Box>
      <Box flexBasis="50%" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchValue ? filteredRows : rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
