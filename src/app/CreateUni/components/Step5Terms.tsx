"use client";
import React, { useState } from "react";
import { Term, SubSpecialty, Program, Course } from "./types";
import ModalForm from "./ModalForm";
import styles from "./Step5.module.css";

interface Step5Props {
  programs: Program[];
  subSpecialties: { [programId: string]: SubSpecialty[] };
  terms: { [subId: string]: Term[] };
  setTerms: React.Dispatch<React.SetStateAction<{ [subId: string]: Term[] }>>;
  courses: { [subId: string]: Course[] };
}

export default function Step5TermsMapping({
  programs,
  subSpecialties,
  terms,
  setTerms,
  courses,
}: Step5Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSubId, setTargetSubId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");


  const handleSaveTerm = (data: Course | Term) => {
    if (!("courseCode" in data)) {
      setTerms((prev) => ({
        ...prev,
        [targetSubId!]: prev[targetSubId!] ? [...prev[targetSubId!], data] : [data],
      }));
    }
    setModalOpen(false);
  };


  const handleAssignCourse = (subId: string, termId: string, courseId: string) => {
    setTerms((prev) => {
      const updated = { ...prev };

      const courseToAssign = courses[subId]?.find((c) => c.id === courseId);
      if (!courseToAssign) return prev;

      Object.entries(updated).forEach(([someSubId, termArray]) => {
        updated[someSubId] = termArray.map((term) => ({
          ...term,
          courses: term.courses.filter((c) => c.id !== courseId),
        }));
      });

      updated[subId] = updated[subId].map((term) =>
        term.id === termId ? { ...term, courses: [courseToAssign, ...term.courses] } : term
      );

      return updated;
    });

    setSelectedCourseId("");
  };

  return (
    <div className={styles.container}>
      {programs.map((prog) => (
        <div key={prog.id} className={styles.programCard}>
          <h3 className={styles.programTitle}>{prog.name}</h3>

          {subSpecialties[prog.id]?.map((sub) => (
            <div key={sub.id} className={styles.subSpecialtyCard}>
              <div className={styles.subSpecialtyHeader}>
                <h4 className={styles.subSpecialtyTitle}>{sub.name}</h4>
                <button
                  className={styles.addTermButton}
                  onClick={() => {
                    setTargetSubId(sub.id);
                    setModalOpen(true);
                  }}
                >
                  + Add Term
                </button>
              </div>

              {terms[sub.id]?.map((term) => (
                <div key={term.id} className={styles.termCard}>
                  <h5 className={styles.termTitle}>{term.name}</h5>

                  {term.courses.length > 0 ? (
                    <div className={styles.assignedCourses}>
                      <h6 className={styles.assignedCoursesTitle}>Assigned Courses:</h6>
                      <ul className={styles.courseList}>
                        {term.courses.map((course) => (
                          <li key={course.id} className={styles.courseItem}>
                            {course.name} ({course.courseCode || "No Code"})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className={styles.noCourses}>No courses assigned yet.</p>
                  )}

                  <select
                    className={styles.dropdown}
                    value={selectedCourseId}
                    onChange={(e) => handleAssignCourse(sub.id, term.id, e.target.value)}
                  >
                    <option value="">-- Select a Course --</option>
                    {courses[sub.id]?.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {modalOpen && (
        <ModalForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveTerm}
          type="term"
        />
      )}
    </div>
  );
}
