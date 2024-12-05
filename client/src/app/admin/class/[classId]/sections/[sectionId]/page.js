"use client";
import SubjectForm from "@/components/add-subject";
import React, { useEffect, useState } from "react";
import ClassLayout from "../../../classLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import BreadCrumbsItem from "@/components/dynamic-breadCrumbs";
import axios from "axios";

const Section = () => {
  const params = useParams();
  const [sectionDetails, setSectionDetails] = useState({});
  const fetchSectionDetails = async () => {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/sections/" + params.sectionId,
    );
    setSectionDetails(data);
  };
  useEffect(() => {
    fetchSectionDetails();
  }, []);
  return (
    <ClassLayout breadCrumbsItem={<BreadCrumbsItem depth={3} />}>
      <SubjectForm />
      {/* {JSON.stringify(sectionDetails)} */}
      <p>
        Section Name:
        {sectionDetails.sectionName}
      </p>
      <p>Class Teacher: {sectionDetails.classTeacher?.fullName}</p>
    </ClassLayout>
  );
};

export default Section;
