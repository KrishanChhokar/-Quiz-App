import React from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReports } from "../../../apicalls/reports";
import { useEffect } from "react";
import moment from "moment";

function AdminReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({
    examName: "",
    userName: "",
  });
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(tempFilters);
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button
          className="primary-outlined-btn"
          onClick={() => {
            setFilters({
              examName: "",
              userName: "",
            });
            getData({
              examName: "",
              userName: "",
            });
          }}
        >
          Clear 
        </button>
        <button className="primary-contained-btn" onClick={() => getData(filters)}>
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={reportsData} className="mt-2" />
    </div>
  );
}

export default AdminReports;






// import React from "react";
// import PageTitle from "../../../components/PageTitle";
// import { message, Table } from "antd";
// import { useDispatch, useSelector } from "react-redux"; // Import useSelector to access user data
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { getAllReports } from "../../../apicalls/reports";
// import { useEffect } from "react";
// import moment from "moment";
// import { useNavigate } from "react-router-dom"; // To redirect non-admin users

// function AdminReports() {
//   const [reportsData, setReportsData] = React.useState([]);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users); // Access the logged-in user's data
//   const navigate = useNavigate();
//   const [filters, setFilters] = React.useState({
//     examName: "",
//     userName: "",
//   });

//   useEffect(() => {
//     if (!user) {
//       // If user data hasn't loaded yet, show a loading state or redirect
//       message.error("User data not available. Please try again.");
//       navigate("/");
//       return;
//     }

//     // Debugging: check if user isAdmin is correctly set
//     console.log("User isAdmin:", user.isAdmin);

//     // Check if the logged-in user is an admin
//     if (!user.isAdmin) {
//       message.error("You are not authorized to view this page.");
//       navigate("/");
//     } else {
//       // Fetch the reports data for admin users
//       getData(filters);
//     }
//   }, [user, filters, navigate]);

//   const columns = [
//     {
//       title: "Exam Name",
//       dataIndex: "examName",
//       render: (text, record) => <>{record.exam.name}</>,
//     },
//     {
//       title: "User Name",
//       dataIndex: "userName",
//       render: (text, record) => <>{record.user.name}</>,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text, record) => (
//         <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
//       ),
//     },
//     {
//       title: "Total Marks",
//       dataIndex: "totalQuestions",
//       render: (text, record) => <>{record.exam.totalMarks}</>,
//     },
//     {
//       title: "Passing Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.exam.passingMarks}</>,
//     },
//     {
//       title: "Obtained Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.result.correctAnswers.length}</>,
//     },
//     {
//       title: "Verdict",
//       dataIndex: "verdict",
//       render: (text, record) => <>{record.result.verdict}</>,
//     },
//     // Add a column for viewing the answers
//     {
//       title: "Review Answers",
//       render: (text, record) => (
//         <button
//           className="primary-outlined-btn"
//           onClick={() => {
//             // Logic to review the answers for each user
//             navigate(`/admin/reports/review/${record._id}`);
//           }}
//         >
//           View Answers
//         </button>
//       ),
//     },
//   ];

//   const getData = async (tempFilters) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllReports(tempFilters);
//       if (response.success) {
//         setReportsData(response.data);
//       } else {
//         message.error(response.message);
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <PageTitle title="Reports" />
//       <div className="divider"></div>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Exam"
//           value={filters.examName}
//           onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="User"
//           value={filters.userName}
//           onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
//         />
//         <button
//           className="primary-outlined-btn"
//           onClick={() => {
//             setFilters({
//               examName: "",
//               userName: "",
//             });
//             getData({
//               examName: "",
//               userName: "",
//             });
//           }}
//         >
//           Clear
//         </button>
//         <button
//           className="primary-contained-btn"
//           onClick={() => getData(filters)}
//         >
//           Search
//         </button>
//       </div>
//       <Table columns={columns} dataSource={reportsData} className="mt-2" />
//     </div>
//   );
// }

// export default AdminReports;
