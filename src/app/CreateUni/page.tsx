"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import UniForm from "./components/UniForm";
import { FormDataShape } from "./components/types";


const mock_uni_data: FormDataShape = {
  universityName: "Mock University",
  accreditation: "Mock Accreditation",
  establishedYear: "2000",
  location: "Mock City",
  programs: [
    {
      id: "2",
      name: "Mock Program for Edit",
      description: "This is a mock program to demonstrate program editing.",
      degree: "Master",
      admissionRequirement: "Some mock requirements",
      applicationProcedure: "Mock procedure",
      tuition: 1234,
      subSpecialties: [], 
    },
  ],
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
   
    if (editType && uniId) {
      setLoading(true);

      
      setTimeout(() => {
        console.log(
          `Mock: fetching data for uniId=${uniId}, editType=${editType}, programId=${programId}`
        );
        setExistingData(mock_uni_data);
        setLoading(false);
      }, 1000);
    }
  }, [editType, uniId, programId]);

  
  if (loading) {
    return <div>Loading existing data...</div>;
  }

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
