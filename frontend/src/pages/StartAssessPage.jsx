// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   BarChart2,
//   Check,
//   X,
// } from "lucide-react";
// import axios from "axios";
// import useAuth from "../hooks/useAuth";

// const StartAssessmentPage = () => {
//   const { sub } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(60 * 60);
//   const [showSurvey, setShowSurvey] = useState(false);
//   const [assessmentCompleted, setAssessmentCompleted] = useState(false);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [detailedResponses, setDetailedResponses] = useState([]);
//   const [showDetailedReport, setShowDetailedReport] = useState(false);
//   const [surveyResponse, setSurveyResponse] = useState({
//     satisfaction: "",
//     difficulty: "",
//     preferredMaterial: "",
//     timeSpentStudying: "",
//     motivationLevel: "",
//     comments: "",
//     memorizationVsApplication: "",
//     timeManagement: "",
//   });


//   const [recommendedTopics, setRecommendedTopics] = useState([]);
//   const [subTopicStats, setSubTopicStats] = useState({});
//   const { user } = useAuth();

//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   const getDifficultyColor = (difficulty) => {
//     if (difficulty === undefined || difficulty === null) return "bg-gray-200";

//     // Convert numeric difficulty to text
//     if (difficulty === 0 || difficulty === "0")
//       return "bg-green-200 text-green-800"; // Easy
//     if (difficulty === 1 || difficulty === "1")
//       return "bg-yellow-200 text-yellow-800"; // Medium
//     if (difficulty === 2 || difficulty === "2")
//       return "bg-red-200 text-red-800"; // Hard

//     // For text-based difficulty (if you ever switch to that format)
//     const level = String(difficulty).toLowerCase();
//     if (level === "easy") return "bg-green-200 text-green-800";
//     if (level === "medium") return "bg-yellow-200 text-yellow-800";
//     if (level === "hard") return "bg-red-200 text-red-800";

//     return "bg-gray-200";
//   };

//   const getDifficultyText = (difficulty) => {
//     if (difficulty === 0 || difficulty === "0" || difficulty === "Easy") return "Easy";
//     if (difficulty === 1 || difficulty === "1" || difficulty === "Medium") return "Medium";
//     if (difficulty === 2 || difficulty === "2" || difficulty === "Hard") return "Hard";
  
//    console.log("Difficulty level received:", difficulty);
  
//     // console.warn("Unrecognized difficulty:", difficulty);
//     return "Unknown";
//   };
  
  
  

//   const getSubjectSubTopics = (subject) => {
//     const subjectLower = subject.toLowerCase();
//     if (subjectLower === "physics") {
//       return [
//         "Mechanics",
//         "Thermodynamics",
//         "Optics",
//         "Electricity",
//         "Magnetism",
//         "Gravitation",
//         "Modern Physics",
//       ];
//     } else if (subjectLower === "chemistry") {
//       return [
//         "Organic Chemistry",
//         "Inorganic Chemistry",
//         "Physical Chemistry",
//         "Analytical Chemistry",
//         "Biochemistry",
//       ];
//     } else if (subjectLower === "biology") {
//       return [
//         "Cell Biology",
//         "Genetics",
//         "Ecology",
//         "Anatomy",
//         "Physiology",
//         "Botany",
//         "Zoology",
//       ];
//     } else if (subjectLower === "mathematics") {
//       return [
//         "Algebra",
//         "Geometry",
//         "Calculus",
//         "Statistics",
//         "Trigonometry",
//         "Probability",
//       ];
//     } else {
//       return [
//         "General Knowledge",
//         "Fundamentals",
//         "Advanced Concepts",
//         "Applications",
//       ];
//     }
//   };

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/quiz/${sub.toLowerCase()}`
//         );
//         console.log("Fetched questions:", response.data[0]);
//         // Adding a default sub-topic to each question if not provided
//         const processedQuestions = response.data.map((q) => {
//           if (!q.subTopic) {
//             // Generate a random sub-topic for demonstration purposes
//             // In a real application, each question should have an actual sub-topic
//             const subTopics = getSubjectSubTopics(sub);
//             q.subTopic =
//               subTopics[Math.floor(Math.random() * subTopics.length)];
//           }
//           return q;
//         });

//         setQuestions(shuffleArray(processedQuestions));
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         navigate("/assessment");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();

//     const timer = setInterval(() => {
//       setTimeRemaining((prev) => {
//         if (prev <= 0) {
//           clearInterval(timer);
//           handleSubmitAssessment();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [sub, navigate]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentQuestion]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleSelectAnswer = (answerKey) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questions[currentQuestion].Question]: answerKey,
//     }));
//   };

//   const handleSurveyChange = (e) => {
//     const { name, value } = e.target;
//     setSurveyResponse((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSurveySubmit = async () => {
//     if (!user) {
//       alert("User not logged in!");
//       return;
//     }

//     try {
//       const userId = user._id || user.id;

//       // 1️⃣ Save survey to DB
//       await axios.post(
//         `http://localhost:5000/api/assessments/survey/${userId}`,
//         surveyResponse
//       );

//       // Close survey modal and show detailed report
//       setShowSurvey(false);
//       setShowDetailedReport(true);
//     } catch (error) {
//       console.error("Survey submission error:", error);
//       alert("Something went wrong during survey submission.");

//       // Still proceed to show detailed report even if survey submission fails
//       setShowSurvey(false);
//       setShowDetailedReport(true);
//     }
//   };

//   const calculateSubTopicStats = (responses) => {
//     const stats = {};

//     responses.forEach((response) => {
//       const subTopic = response.subTopic || "Uncategorized";

//       if (!stats[subTopic]) {
//         stats[subTopic] = {
//           total: 0,
//           correct: 0,
//           percentage: 0,
//         };
//       }

//       stats[subTopic].total += 1;
//       if (response.isCorrect) {
//         stats[subTopic].correct += 1;
//       }
//     });

//     // Calculate percentages
//     Object.keys(stats).forEach((subTopic) => {
//       stats[subTopic].percentage = Math.round(
//         (stats[subTopic].correct / stats[subTopic].total) * 100
//       );
//     });

//     return stats;
//   };

//   const handleViewRecommendations = async () => {
//     try {
//       // Get recommendations from ML service
//       const response = await axios.post(
//         "http://localhost:5001/recommend",
//         {
//           responses: [
//             surveyResponse.satisfaction,
//             surveyResponse.difficulty,
//             surveyResponse.preferredMaterial,
//             surveyResponse.timeSpentStudying,
//             surveyResponse.motivationLevel,
//             surveyResponse.comments,
//             surveyResponse.memorizationVsApplication || "Application", // Default value if not provided
//             surveyResponse.timeManagement || "Yes", // Default value if not provided
//           ],
//           subTopicStats: subTopicStats, // Include sub-topic stats for better recommendations
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       // Close detailed report and show recommendations
//       setShowDetailedReport(false);

//       // Update recommendations state
//       if (response.data.recommended_topics) {
//         setRecommendedTopics(response.data.recommended_topics);
//       } else {
//         // Generate recommendations based on sub-topic performance
//         const poorPerformanceTopics = Object.entries(subTopicStats)
//           .filter(([_, stats]) => stats.percentage < 60)
//           .map(([topic, _]) => topic);

//         if (poorPerformanceTopics.length > 0) {
//           setRecommendedTopics([
//             `Focus on improving your understanding of ${poorPerformanceTopics.join(
//               ", "
//             )}`,
//             `Review core concepts in ${sub}`,
//             `Practice more problems with time constraints`,
//           ]);
//         } else {
//           // Fallback recommendations if API doesn't return any
//           setRecommendedTopics([
//             "Review core concepts in " + sub,
//             "Practice more problems with time constraints",
//             "Focus on understanding application of concepts",
//           ]);
//         }
//       }
//     } catch (error) {
//       console.error("Recommendation error:", error);

//       // Fallback recommendations if API fails
//       setRecommendedTopics([
//         "Review fundamentals of " + sub,
//         "Practice with timed assessments",
//         "Focus on difficult concepts identified in your results",
//       ]);
//       setShowDetailedReport(false);
//     }
//   };

//   const handleSubmitAssessment = async () => {
//     let correct = 0;
//     const responses = [];

//     questions.forEach((q) => {
//       const correctAnswer =
//         q["Correct Answer"] || q["correct_answer"] || q["answer"];
//       const selectedOption = selectedAnswers[q.Question];
//       const selectedAnswer = selectedOption ? q[selectedOption] : null;
//       const subTopic = q.subTopic || "Uncategorized";

//       let isCorrect = false;

//       if (["A", "B", "C", "D"].includes(correctAnswer)) {
//         isCorrect = selectedOption && selectedOption.includes(correctAnswer);
//       } else {
//         isCorrect =
//           selectedAnswer &&
//           String(selectedAnswer).trim().toLowerCase() ===
//             String(correctAnswer).trim().toLowerCase();
//       }

//       if (isCorrect) correct++;

//       responses.push({
//         question: q.Question,
//         correctAnswer: correctAnswer || "Not provided",
//         userAnswer: selectedAnswer || "Not answered",
//         selectedOption: selectedOption || "None",
//         isCorrect: !!isCorrect,
//         difficulty:
//           q.Difficulty||
//           q["Difficulty Level"] ||
//           q.difficulty ||
//           "Not specified",
//         subTopic: subTopic,
//         optionA: q["Option A"] || q.A || "",
//         optionB: q["Option B"] || q.B || "",
//         optionC: q["Option C"] || q.C || "",
//         optionD: q["Option D"] || q.D || "",
//       });
//     });

//     // Calculate sub-topic statistics
//     const topicStats = calculateSubTopicStats(responses);
//     setSubTopicStats(topicStats);

//     const assessmentData = {
//       subject: sub,
//       totalQuestions: questions.length,
//       correctAnswers: correct,
//       score: (correct / questions.length) * 100,
//       timeSpent: 3600 - timeRemaining,
//       detailedResponses: responses,
//       subTopicStats: topicStats, // Add this line to include subTopicStats
//     };

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in again");
//         navigate("/login");
//         return;
//       }

//       const response = await axios.post(
//         "http://localhost:5000/api/assessments/submit",
//         assessmentData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Store the report ID for future reference if needed
//       localStorage.setItem("lastReportId", response.data.resultId);

//       // Update state to show assessment completion and store detailed responses
//       setCorrectAnswers(correct);
//       setDetailedResponses(responses);
//       setAssessmentCompleted(true);
//       setShowSurvey(true); // Show survey modal
//     } catch (error) {
//       console.error("Assessment submission failed:", error);
//       alert("Could not save assessment. Try again.");
//     }
//   };
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
//       </div>
//     );
//   }

//   const currentDifficulty =
//   questions[currentQuestion]?.Difficulty ||
//   questions[currentQuestion]?.["Difficulty Level"] ||
//   questions[currentQuestion]?.difficulty ||
//   "Not specified";

//   console.log("Current Difficulty level:",currentDifficulty);
  
//   const currentSubTopic =
//     questions[currentQuestion]?.subTopic || "Uncategorized";

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-3xl">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {/* Show assessment results if assessment is completed */}
//         {assessmentCompleted ? (
//           <div className="mb-6">
//             <h2 className="text-xl font-bold mb-4">Assessment Results</h2>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex justify-between mb-2">
//                 <span>Score:</span>
//                 <span className="font-bold">{`${correctAnswers}/${questions.length}`}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Percentage:</span>
//                 <span className="font-bold">{`${Math.round(
//                   (correctAnswers / questions.length) * 100
//                 )}%`}</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full"
//                   style={{
//                     width: `${(correctAnswers / questions.length) * 100}%`,
//                   }}
//                 ></div>
//               </div>
//               <div className="text-center mt-4">
//                 <p className="text-gray-700">
//                   Thank you for completing the assessment!
//                 </p>
//                 <p className="text-gray-700 mb-4">
//                   Please provide feedback in our survey to help us improve.
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mb-6 border-b pb-4">
//               <h1 className="text-xl font-bold">
//                 {sub.charAt(0).toUpperCase() + sub.slice(1)} Assessment
//               </h1>
//               <div className="flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-red-500" />
//                 <span
//                   className={`font-mono font-bold ${
//                     timeRemaining < 300 ? "text-red-500" : ""
//                   }`}
//                 >
//                   {formatTime(timeRemaining)}
//                 </span>
//               </div>
//             </div>

//             {questions.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-2">
//                   <h2 className="text-lg font-semibold">
//                     {`Q${currentQuestion + 1}: ${questions[
//                       currentQuestion
//                     ].Question.replace(/^Q\d+: /, "")}`}
//                   </h2>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
//                       {currentSubTopic}
//                     </span>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full 
//                       ${getDifficultyColor(currentDifficulty)}`}
//                     >
//                       {getDifficultyText(currentDifficulty)}
                     
//                     </span>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   {["Option A", "Option B", "Option C", "Option D"].map(
//                     (key, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleSelectAnswer(key)}
//                         className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
//                           selectedAnswers[
//                             questions[currentQuestion].Question
//                           ] === key
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <label className="flex items-center cursor-pointer">
//                           <input
//                             type="radio"
//                             name={`question-${currentQuestion}`}
//                             checked={
//                               selectedAnswers[
//                                 questions[currentQuestion].Question
//                               ] === key
//                             }
//                             onChange={() => handleSelectAnswer(key)}
//                             className="mr-3"
//                           />
//                           {questions[currentQuestion][key]}
//                         </label>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={() =>
//                   setCurrentQuestion((prev) => Math.max(prev - 1, 0))
//                 }
//                 disabled={currentQuestion === 0}
//                 className={`flex items-center px-4 py-2 rounded-md ${
//                   currentQuestion === 0
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 <ChevronLeft className="w-4 h-4 mr-1" /> Previous
//               </button>
//               {currentQuestion < questions.length - 1 ? (
//                 <button
//                   onClick={() => setCurrentQuestion((prev) => prev + 1)}
//                   className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   Next <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmitAssessment}
//                   className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                 >
//                   Submit Assessment
//                 </button>
//               )}
//             </div>

//             <div className="mt-6 flex flex-wrap gap-2 justify-center">
//               {questions.map((question, index) => {
//                 const difficulty =
//                   question.Difficulty || question.difficulty || null;
//                 let borderColor = "border-gray-300";
//                 if (
//                   difficulty === 0 ||
//                   difficulty === "0" ||
//                   difficulty?.toLowerCase() === "easy"
//                 )
//                   borderColor = "border-green-500";
//                 else if (
//                   difficulty === 1 ||
//                   difficulty === "1" ||
//                   difficulty?.toLowerCase() === "medium"
//                 )
//                   borderColor = "border-yellow-500";
//                 else if (
//                   difficulty === 2 ||
//                   difficulty === "2" ||
//                   difficulty?.toLowerCase() === "hard"
//                 )
//                   borderColor = "border-red-500";

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentQuestion(index)}
//                     className={`w-10 h-10 rounded-full border-2 ${borderColor} ${
//                       currentQuestion === index
//                         ? "bg-blue-500 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-100"
//                     } ${selectedAnswers[question.Question] ? "font-bold" : ""}`}
//                   >
//                     {index + 1}
//                   </button>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
// !<-------- ---------------------------------------------------------------------------------------->
//       {/* Survey Modal */}
//       {showSurvey && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
//             <h2 className="text-xl font-bold mb-2">We'd love your feedback!</h2>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 1️⃣ How satisfied were you with this test?
//               </span>
//               <select
//                 name="satisfaction"
//                 onChange={handleSurveyChange}
//                 value={surveyResponse.satisfaction}
//                 className="mt-1 w-full border p-2 rounded"
//               >
//                 <option value="">Select</option>
//                 <option value="very_satisfied">Very Satisfied</option>
//                 <option value="satisfied">Satisfied</option>
//                 <option value="neutral">Neutral</option>
//                 <option value="unsatisfied">Unsatisfied</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 2️⃣ Was the test too difficult?
//               </span>
//               <select
//                 name="difficulty"
//                 onChange={handleSurveyChange}
//                 value={surveyResponse.difficulty}
//                 className="mt-1 w-full border p-2 rounded"
//               >
//                 <option value="">Select</option>
//                 <option value="too_easy">Too Easy</option>
//                 <option value="just_right">Just Right</option>
//                 <option value="too_hard">Too Hard</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 3️⃣ What study material do you prefer?
//               </span>
//               <select
//                 name="preferredMaterial"
//                 onChange={handleSurveyChange}
//                 value={surveyResponse.preferredMaterial}
//                 className="mt-1 w-full border p-2 rounded"
//               >
//                 <option value="">Select</option>
//                 <option value="videos">Video Lectures</option>
//                 <option value="books">Books & PDFs</option>
//                 <option value="practice">Practice Questions</option>
//                 <option value="discussion">Group Discussion</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 4️⃣ How much time did you spend preparing?
//               </span>
//               <input
//                 type="number"
//                 name="timeSpentStudying"
//                 placeholder="In hours"
//                 value={surveyResponse.timeSpentStudying}
//                 onChange={handleSurveyChange}
//                 className="mt-1 w-full border p-2 rounded"
//               />
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 5️⃣ What was your motivation level during study?
//               </span>
//               <select
//                 name="motivationLevel"
//                 onChange={handleSurveyChange}
//                 value={surveyResponse.motivationLevel}
//                 className="mt-1 w-full border p-2 rounded"
//               >
//                 <option value="">Select</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 6️⃣ What's your learning approach?
//               </span>
//               <select
//                 name="memorizationVsApplication"
//                 onChange={handleSurveyChange}
//                 value={surveyResponse.memorizationVsApplication}
//                 className="mt-1 w-full border p-2 rounded"
//               >
//                 <option value="">Select</option>
//                 <option value="Memorization">Memorization</option>
//                 <option value="Application">Application</option>
//                 <option value="Both">Both</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 7️⃣ Do you struggle with time management?
//               </span>
//               <select
//                 name="timeManagement"
//                 onChange={handleSurveyChange}
//                 value={surveyResponse.timeManagement}
//                 className="mt-1 w-full border p-2 rounded"
//               >
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//                 <option value="Somewhat">Somewhat</option>
//               </select>
//             </label>

//             <label className="block">
//               <span className="text-sm font-medium">
//                 💬 Additional Comments
//               </span>
//               <textarea
//                 name="comments"
//                 rows="3"
//                 value={surveyResponse.comments}
//                 onChange={handleSurveyChange}
//                 className="mt-1 w-full border p-2 rounded"
//               />
//             </label>

//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={handleSurveySubmit}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Detailed Report Modal */}
//       {showDetailedReport && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-5/6 overflow-auto">
//             <h2 className="text-2xl font-bold text-center mb-6">
//               Detailed Assessment Report
//             </h2>

//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h3 className="font-bold text-lg">
//                     {sub.charAt(0).toUpperCase() + sub.slice(1)}
//                   </h3>
//                   <p className="text-gray-600">
//                     Assessment completed on {new Date().toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-xl">
//                     {Math.round((correctAnswers / questions.length) * 100)}%
//                   </p>
//                   <p className="text-gray-600">
//                     {correctAnswers} of {questions.length} correct
//                   </p>
//                 </div>
//               </div>

//               {/* Sub-topic Performance Section */}
//               <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                 <h4 className="font-bold mb-4">Performance by Sub-topic</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {Object.entries(subTopicStats).map(
//                     ([topic, stats], index) => (
//                       <div
//                         key={index}
//                         className="bg-white p-4 rounded-md shadow-sm"
//                       >
//                         <div className="flex justify-between items-center mb-2">
//                           <h5 className="font-medium">{topic}</h5>
//                           <span className="font-bold text-lg">
//                             {stats.percentage}%
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600 mb-2">
//                           {stats.correct}/{stats.total} correct
//                         </p>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className={`h-2 rounded-full ${
//                               stats.percentage >= 80
//                                 ? "bg-green-500"
//                                 : stats.percentage >= 60
//                                 ? "bg-yellow-500"
//                                 : "bg-red-500"
//                             }`}
//                             style={{ width: `${stats.percentage}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>

//               <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                 <h4 className="font-bold mb-2">
//                   Performance by Difficulty Level
//                 </h4>
//                 <div className="grid grid-cols-3 gap-4">
//                   {["easy", "medium", "hard"].map((difficulty) => {
//                     const questionsOfDifficulty = detailedResponses.filter((q) => {
//                       // Handle numeric difficulty values
//                       if (q.difficulty === 0 || q.difficulty === "0") return difficulty === "easy";
//                       if (q.difficulty === 1 || q.difficulty === "1") return difficulty === "medium";
//                       if (q.difficulty === 2 || q.difficulty === "2") return difficulty === "hard";
                      
//                       // Also handle text-based difficulty if present
//                       if (typeof q.difficulty === "string") {
//                         const diffLower = q.difficulty.toLowerCase();
//                         if (diffLower.includes("easy")) return difficulty === "easy";
//                         if (diffLower.includes("medium")) return difficulty === "medium";
//                         if (diffLower.includes("hard")) return difficulty === "hard";
//                       }
                      
//                       return false;
//                     });
//                     const correctOfDifficulty = questionsOfDifficulty.filter(
//                       (q) => q.isCorrect
//                     ).length;
//                     const total = questionsOfDifficulty.length;

//                     return (
//                       <div
//                         key={difficulty}
//                         className="bg-white p-3 rounded-md shadow-sm"
//                       >
//                         <p className="font-medium capitalize">{difficulty}</p>
//                         <p className="text-lg font-bold">
//                           {total > 0
//                             ? Math.round((correctOfDifficulty / total) * 100)
//                             : 0}
//                           %
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {correctOfDifficulty}/{total} correct
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h3 className="font-bold text-lg">Question Analysis</h3>

//               {detailedResponses.map((response, index) => (
//                 <div
//                   key={index}
//                   className={`border-l-4 ${
//                     response.isCorrect ? "border-green-500" : "border-red-500"
//                   } p-4 rounded-lg shadow-sm`}
//                 >
//                   <div className="flex flex-wrap justify-between items-start mb-2">
//                     <h4 className="font-medium flex items-center">
//                       {response.isCorrect ? (
//                         <Check className="w-5 h-5 text-green-600 mr-2" />
//                       ) : (
//                         <X className="w-5 h-5 text-red-600 mr-2" />
//                       )}
//                       Question {index + 1}
//                     </h4>
//                     <div className="flex gap-2 flex-wrap">
//                       <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
//                         {response.subTopic}
//                       </span>
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
//                           response.difficulty
//                         )}`}
//                       >
//                         {getDifficultyText(response.difficulty)}
//                       </span>
//                     </div>
//                   </div>

//                   <p className="mb-3">
//                     {response.question.replace(/^Q\d+: /, "")}
//                   </p>

//                   <div className="grid grid-cols-1 gap-2 mb-2">
//                     {["Option A", "Option B", "Option C", "Option D"].map(
//                       (option, i) => {
//                         const optionKey = option
//                           .replace("Option ", "")
//                           .toLowerCase();
//                         const optionText =
//                           response[`option${option.split(" ")[1]}`];
//                         const correctOption =
//                           response.correctAnswer === option.split(" ")[1];
//                         const selectedOption =
//                           response.selectedOption === option;

//                         return (
//                           <div
//                             key={i}
//                             className={`p-2 rounded-md ${
//                               correctOption
//                                 ? "bg-green-100 border border-green-300"
//                                 : selectedOption && !correctOption
//                                 ? "bg-red-100 border border-red-300"
//                                 : "bg-gray-50 border border-gray-200"
//                             }`}
//                           >
//                             <span className="font-medium mr-2">
//                               {option.split(" ")[1]}:
//                             </span>
//                             <span>{optionText}</span>
//                             {(correctOption || selectedOption) && (
//                               <span className="ml-2">
//                                 {correctOption && (
//                                   <span className="text-green-600">
//                                     ✓ Correct
//                                   </span>
//                                 )}
//                                 {selectedOption && !correctOption && (
//                                   <span className="text-red-600">
//                                     × Your answer
//                                   </span>
//                                 )}
//                               </span>
//                             )}
//                           </div>
//                         );
//                       }
//                     )}
//                   </div>
//                   {!response.isCorrect && (
//                     <div className="bg-blue-50 p-3 rounded-md mt-2 text-sm">
//                       <p className="font-medium text-blue-800">Explanation:</p>
//                       <p>
//                         The correct answer is Option {response.correctAnswer}.
//                       </p>
//                       {response.selectedOption ? (
//                         <p>
//                           You selected Option{" "}
//                           {response.selectedOption.replace("Option ", "")}.
//                         </p>
//                       ) : (
//                         <p>You did not select an answer for this question.</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleViewRecommendations}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center"
//               >
//                 View Recommendations
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
// -------------------------------------------------------------------------------------------
//       {/* Recommended Topics Modal */}
//       {recommendedTopics.length > 0 && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
//             <h2 className="text-xl font-bold text-center">
//               🎯 Recommended Topics
//             </h2>
//             <p className="text-gray-600 text-center mb-4">
//               Based on your assessment performance and feedback
//             </p>

//             {/* Show sub-topic specific recommendations */}
//             <div className="mb-4">
//               <h3 className="font-medium text-gray-800 mb-2">Focus Areas:</h3>
//               <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
//                 {Object.entries(subTopicStats)
//                   .filter(([_, stats]) => stats.percentage < 60)
//                   .map(([topic, _], index) => (
//                     <li key={index} className="text-red-600">
//                       {topic} - Needs improvement
//                     </li>
//                   ))}
//                 {Object.entries(subTopicStats)
//                   .filter(
//                     ([_, stats]) =>
//                       stats.percentage >= 60 && stats.percentage < 80
//                   )
//                   .map(([topic, _], index) => (
//                     <li key={index} className="text-yellow-600">
//                       {topic} - Continue practicing
//                     </li>
//                   ))}
//               </ul>
//             </div>

//             <h3 className="font-medium text-gray-800 mb-2">
//               General Recommendations:
//             </h3>
//             <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
//               {recommendedTopics.map((topic, index) => (
//                 <li key={index}>{topic}</li>
//               ))}
//             </ul>

//             <button
//               onClick={() => {
//                 setRecommendedTopics([]);
//                 navigate("/dashboard"); // or wherever you want to send them next
//               }}
//               className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StartAssessmentPage;



import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Timer } from 'lucide-react';
import { Question } from '../components/assessment/Question';
import { Navigation } from '../components/assessment/Navigation';
import { QuestionNavigator } from '../components/assessment/QuestionNavigator';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { useAssessment } from '../hooks/Assessment/useAssessment';
import useAuth from '../hooks/useAuth';
import { SurveyModal } from '../components/survey/SurveyModel';
import { DetailedReportModal } from '../components/assessment/DetailedReportModel';
import { useSurveyReport } from '../hooks/useSurveyReport';
import { RecommendedTopicsModal } from '../components/assessment/Recommendation/RecommendationTopicsModel';
import axios from 'axios';
import { FocusAreasSection } from '../components/assessment/Recommendation/FocusAreasSection';
const StartAssessmentPage = () => {
  const { sub } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [subTopicStats, setSubTopicStats] = useState(null);
  const [detailedResponses, setDetailedResponses] = useState([]);
  const [recommendedTopics, setRecommendedTopics] = useState([]);

  const {
    loading,
    questions,
    currentQuestion,
    setCurrentQuestion,
    selectedAnswers,
    timeRemaining,
    handleSelectAnswer,
    processAssessmentResults
  } = useAssessment(sub);

  const {
    showSurvey,
    setShowSurvey,
    showDetailedReport,
    surveyResponse,
    handleSurveyChange,
    handleSurveySubmit
    // Note: We won't use handleViewRecommendations from here
  } = useSurveyReport(user, subTopicStats, sub);

  const handleSubmitAssessment = async () => {
    const { correct, responses, subTopicStats } = processAssessmentResults();

    const assessmentData = {
      subject: sub,
      totalQuestions: questions.length,
      correctAnswers: correct,
      score: (correct / questions.length) * 100,
      timeSpent: 3600 - timeRemaining,
      detailedResponses: responses,
      subTopicStats: subTopicStats,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/assessments/submit",
        assessmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCorrectAnswers(correct);
      setAssessmentCompleted(true);
      setDetailedResponses(responses);
      setSubTopicStats(subTopicStats);
      setShowSurvey(true);
    } catch (error) {
      console.error("Assessment submission failed:", error);
      alert("Could not save assessment. Try again.");
    }
  };

  const handleViewRecommendations = () => {
    if (subTopicStats) {
      const recommended = Object.entries(subTopicStats)
        .filter(([_, stat]) => stat.correct < stat.total) // weak areas
        .map(([topic]) => topic);

      setRecommendedTopics(recommended);
    }
  };

  const handleCloseRecommendations = () => {
    setRecommendedTopics([]);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        {assessmentCompleted ? (
          <AssessmentResults
            correctAnswers={correctAnswers}
            totalQuestions={questions.length}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h1 className="text-xl font-bold">
                {sub.charAt(0).toUpperCase() + sub.slice(1)} Assessment
              </h1>
              <Timer timeRemaining={timeRemaining} />
            </div>

            {questions.length > 0 && (
              <Question
                question={questions[currentQuestion]}
                questionIndex={currentQuestion}
                selectedAnswer={selectedAnswers[questions[currentQuestion].Question]}
                onSelectAnswer={handleSelectAnswer}
              />
            )}

            <Navigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onPrevious={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
              onNext={() => setCurrentQuestion(prev => prev + 1)}
              onSubmit={handleSubmitAssessment}
            />

            <QuestionNavigator
              questions={questions}
              currentQuestion={currentQuestion}
              selectedAnswers={selectedAnswers}
              onQuestionSelect={setCurrentQuestion}
            />
          </>
        )}
      </div>

      {/* Always rendered modals below */}

      <SurveyModal
        isOpen={showSurvey}
        surveyResponse={surveyResponse}
        onSurveyChange={handleSurveyChange}
        onSubmit={handleSurveySubmit}
      />

      <DetailedReportModal
        isOpen={showDetailedReport}
        subject={sub}
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        subTopicStats={subTopicStats}
        detailedResponses={detailedResponses}
        onViewRecommendations={handleViewRecommendations}
      />

      {recommendedTopics.length > 0 && (
        <RecommendedTopicsModal
          recommendedTopics={recommendedTopics}
          subTopicStats={subTopicStats}
          onClose={handleCloseRecommendations}
          onNavigateToDashboard={handleNavigateToDashboard}
        />
      )}
    </div>
  );
};

export default StartAssessmentPage;
