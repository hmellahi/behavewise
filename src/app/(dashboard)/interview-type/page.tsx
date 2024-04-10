export default function page() {
  return (<div></div>)
}
// export default function page() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -40 }}
//       key="step-1"
//       transition={{
//         duration: 0.95,
//         ease: [0.165, 0.84, 0.44, 1],
//       }}
//       className="max-w-lg mx-auto px-4 lg:px-0"
//     >
//       <h2 className="text-4xl font-bold text-[#1E2B3A]">
//         Select a question type
//       </h2>
//       <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
//         We have hundreds of questions from top tech companies. Choose a type to
//         get started.
//       </p>
//       <div>
//         <RadioGroup value={selected} onChange={setSelected}>
//           <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
//           <div className="space-y-4">
//             {questions.map((question) => (
//               <RadioGroup.Option
//                 key={question.name}
//                 value={question}
//                 className={({ checked, active }) =>
//                   classNames(
//                     checked ? "border-transparent" : "border-gray-300",
//                     active ? "border-blue-500 ring-2 ring-blue-200" : "",
//                     "relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between"
//                   )
//                 }
//               >
//                 {({ active, checked }) => (
//                   <>
//                     <span className="flex items-center">
//                       <span className="flex flex-col text-sm">
//                         <RadioGroup.Label
//                           as="span"
//                           className="font-medium text-gray-900"
//                         >
//                           {question.name}
//                         </RadioGroup.Label>
//                         <RadioGroup.Description
//                           as="span"
//                           className="text-gray-500"
//                         >
//                           <span className="block">{question.description}</span>
//                         </RadioGroup.Description>
//                       </span>
//                     </span>
//                     <RadioGroup.Description
//                       as="span"
//                       className="flex text-sm ml-4 mt-0 flex-col text-right items-center justify-center"
//                     >
//                       <span className=" text-gray-500">
//                         {question.difficulty === "Easy" ? (
//                           <svg
//                             className="h-full w-[16px]"
//                             viewBox="0 0 22 25"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <rect
//                               y="13.1309"
//                               width="6"
//                               height="11"
//                               rx="1"
//                               fill="#4E7BBA"
//                             />
//                             <rect
//                               x="8"
//                               y="8.13086"
//                               width="6"
//                               height="16"
//                               rx="1"
//                               fill="#E1E1E1"
//                             />
//                             <rect
//                               x="16"
//                               y="0.130859"
//                               width="6"
//                               height="24"
//                               rx="1"
//                               fill="#E1E1E1"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             className="h-full w-[16px]"
//                             viewBox="0 0 22 25"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <rect
//                               y="13.1309"
//                               width="6"
//                               height="11"
//                               rx="1"
//                               fill="#4E7BBA"
//                             />
//                             <rect
//                               x="8"
//                               y="8.13086"
//                               width="6"
//                               height="16"
//                               rx="1"
//                               fill="#4E7BBA"
//                             />
//                             <rect
//                               x="16"
//                               y="0.130859"
//                               width="6"
//                               height="24"
//                               rx="1"
//                               fill="#E1E1E1"
//                             />
//                           </svg>
//                         )}
//                       </span>
//                       <span className="font-medium text-gray-900">
//                         {question.difficulty}
//                       </span>
//                     </RadioGroup.Description>
//                     <span
//                       className={classNames(
//                         active ? "border" : "border-2",
//                         checked ? "border-blue-500" : "border-transparent",
//                         "pointer-events-none absolute -inset-px rounded-lg"
//                       )}
//                       aria-hidden="true"
//                     />
//                   </>
//                 )}
//               </RadioGroup.Option>
//             ))}
//           </div>
//         </RadioGroup>
//       </div>
//       <div className="flex gap-[15px] justify-end mt-8">
//         <div>
//           <Link
//             href="/"
//             className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
//             style={{
//               boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
//             }}
//           >
//             Back to home
//           </Link>
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               setStep(2);
//             }}
//             className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
//             style={{
//               boxShadow:
//                 "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
//             }}
//           >
//             <span> Continue </span>
//             <svg
//               className="w-5 h-5"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M13.75 6.75L19.25 12L13.75 17.25"
//                 stroke="#FFF"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M19 12H4.75"
//                 stroke="#FFF"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
