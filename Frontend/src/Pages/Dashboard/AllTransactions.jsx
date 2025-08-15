import React, { useState, useEffect } from "react";
import TransactionTable from "./Components/Table";
import { useSelector } from "react-redux";
import { getData } from "@/api/api";

export default function AllTransaction() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [data, setData] = useState([]);
  const { token, currentUser } = useSelector((state) => state.user);

  const fetchData = async (page) => {
    try {
      const result = await getData(
        `/transaction/gettransactions/${currentUser.userId}?page=${
          currentPage - 1
        }&size=10&sortBy=date&sortOrder=DESC`,
        token
      );

      setData(result.content);
      setTotalPages(result.totalPages);
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="w-full mt-5">
        <TransactionTable
          data={data}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
