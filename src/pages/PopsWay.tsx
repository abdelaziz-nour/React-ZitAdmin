import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUsersPopsMutation } from "../redux/features/apiSlice";
import { UserData } from "../redux/app/constants";

const PopsWay = () => {
  const [usersData, setUsersData] = useState<Array<UserData>>([]);

  /**
   * RTK Queries
   */
  const [readAllUsers, readAllUsersStatus] = useGetUsersPopsMutation();

  useEffect(() => {
    readAllUsers();
  }, []);

  useEffect(() => {
    if (readAllUsersStatus.isSuccess) {
      const code = 1000;
      const data = readAllUsersStatus.data?.data;
      switch (code) {
        case 1000:
          setUsersData(data);
          break;
        default:
      }
    }

    if (readAllUsersStatus.isError) {
      console.log("Error occurred:", readAllUsersStatus.error);
    }
  }, [readAllUsersStatus]);

  useEffect(() => {
    console.log("Second useEffect:", usersData);
  }, [usersData]);

  return <Box width="100vw" height="100vh"></Box>;
};

export default PopsWay;
