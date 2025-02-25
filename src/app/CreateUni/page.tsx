"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import UniForm from "./components/UniForm";
import { FormDataShape } from "./components/types";

// A big unified mock data set
const mockUniData: FormDataShape = {
  universityName: "Mock University",
  accreditation: "Mock Accreditation",
  establishedYear: "2000",
  location: "Mock City",
  programs: [
    {
      id: "1",
      name: "Master",
      degree: "Master", 
      admissionRequirement: "Some mock requirements", 
      applicationProcedure: "Mock procedure",
      tuition: 5000,
      description: "A Master's program focusing on advanced topics in technology and research.",
      duration: "2 years",
      subSpecialties: [
        {
          id: "sub1",
          name: "Master in AI",
          terms: [
            {
              id: "t1",
              name: "S1", 
              courses: [
                { id: "c1", name: "AI Basics", courseCode: "AI101", credits: 4, prerequisites: [] },
                { id: "c2", name: "Machine Learning", courseCode: "ML102", credits: 4, prerequisites: ["AI Basics"] }
              ]
            },
            {
              id: "t2",
              name: "S2", 
              courses: [
                { id: "c3", name: "Data Structures", courseCode: "DS201", credits: 3, prerequisites: [] },
                { id: "c4", name: "AI Algorithms", courseCode: "AI203", credits: 4, prerequisites: ["Machine Learning"] }
              ]
            },
            {
              id: "t3",
              name: "S3", 
              courses: [],
            },
            {
              id: "t4",
              name: "S4", 
              courses: [],
            },
          ],
          courses: [
            { id: "c1", name: "AI Basics", courseCode: "AI101", credits: 4, prerequisites: [] },
            { id: "c2", name: "Machine Learning", courseCode: "ML102", credits: 4, prerequisites: ["AI Basics"] },
            { id: "c3", name: "Data Structures", courseCode: "DS201", credits: 3, prerequisites: [] },
            { id: "c4", name: "AI Algorithms", courseCode: "AI203", credits: 4, prerequisites: ["Machine Learning"] }
          ]
        },
        {
          id: "sub2",
          name: "Master in Cybersecurity",
          terms: [
            {
              id: "t1",
              name: "S1",
              courses: [
                { id: "c10", name: "Security Basics", courseCode: "SEC101", credits: 3, prerequisites: [] },
                { id: "c11", name: "Cryptography", courseCode: "CRY102", credits: 4, prerequisites: [] }
              ]
            },
          ],
          courses: [
            { id: "c10", name: "Security Basics", courseCode: "SEC101", credits: 3, prerequisites: [] },
            { id: "c11", name: "Cryptography", courseCode: "CRY102", credits: 4, prerequisites: [] },
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Engineering",
      degree: "Master", 
      admissionRequirement: "High School Diploma in Science",
      applicationProcedure: "Online submission",
      tuition: 7000,
      description: "An Engineering program with subprograms in Software, Systems, and Renewable Energy Engineering.",
      duration: "4 years",
      subSpecialties: [
        {
          id: "subEng1",
          name: "Software Engineering",
          terms: [
            { id: "t1", name: "S1", courses: [] },
            { id: "t2", name: "S2", courses: [] },
          ],
          courses: [
          ]
        }
      ]
    }
  ]
};

export default function Page() {
  const searchParams = useSearchParams();
  const editType = searchParams.get("editType");   
  const uniId = searchParams.get("uniId");         
  const programId = searchParams.get("programId"); 
  const stepParam = searchParams.get("step");      
  const [existingData, setExistingData] = useState<FormDataShape | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log("Params =>", { editType, uniId, programId, stepParam });

      if (editType === "global" && uniId) {
        setExistingData(mockUniData);
      } else if (editType === "program" && programId) {
        const selectedProgram = mockUniData.programs.find((p) => p.id === programId);
        if (selectedProgram) {
          const partialData: FormDataShape = {
            ...mockUniData,
            programs: [selectedProgram],
          };
          setExistingData(partialData);
        } else {
          setExistingData(null);
        }
      } else {
        setExistingData(null);
      }
      setLoading(false);
    }, 1000);
  }, [editType, uniId, programId]);

  if (loading) return <div>Loading existing data...</div>;

  const defaultStep = stepParam ? parseInt(stepParam, 10) : 0;
  const isEdit = !!editType;

  return (
    <UniForm
      editMode={isEdit}
      existingData={existingData || undefined}
      defaultStep={defaultStep}
    />
  );
}
