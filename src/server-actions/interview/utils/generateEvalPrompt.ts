import { Answer } from "@prisma/client";
import answerService from "../services/answerService";

function generateAnswersSummary(answers: Answer[]) {
  const answersSummary = answers.map((answer) => {
    const {
      transcript,
      // @ts-ignore
      question: { caption: question },
    } = answer;
    return { answer: transcript, question };
  });

  return JSON.stringify(answersSummary);
}

const answers = [
  {
    id:"2",
    question:
      "Tell me about yourself. Why don't you walk me through your resume?",
    conditions:
      "Please also give feedback on the candidate's communication skills. Make sure their response is structured (perhaps using the STAR or PAR frameworks).",
    answer: `Firstly, I'd like to thank you for considering me for this interview.

    I have 2 years of experience as a frontend developer.
    
    I started learning to code back in 2019 when I was in high school. Following that, I pursued my education at 1337, a unique software engineering school. 1337 follows a peer learning approach, meaning we didn't have teachers. Instead, we were teaching each other to complete different school projects and I also was doing some freelancing on the side.
    
    while I was in school, I received an offer from Leyton as a software developer because I was one of the top students in my school, so I joined Leyton as an intern. After completing my internship, I received an offer as a Full Stack Engineer. due to my commitment and Hard work. I was then promoted to an intermediate position within just one year.
    
    During my spare time, I was part of the founding team of Fileqa, a platform that instantly provides users with insights from documents, and we managed to have more than 100 users after our launch.`,
  },
  {
    id : "1",
    question:
      "What’s an example of a difficult problem you solved? Be specific about how the problem was diagnosed and your process for approaching it.",
    answer: `
    When i was in internship, We had a project in production, having thousands of users. Its frontend needed to be remade because the frontend codebase become hard to maintain .

the first thing that I proposed was remaking the whole frontend from scratch but my manager didn’t agree. So I did my research and come up with micro frontends architecture, which allows a smooth transition to new technologies while delivering new features. 
Then, I collaborated with another intern, and we created a proof of concept where we migrated a core feature's frontend to a new stack and we plugged the feature into the legacy app, we made it faster by 4 times, the feautre was abt uploading and downloading document so we made it like google drive experience, it become very intuitive, and the client was really happy and satisfied by our work.
`,
  },
];

export const generateEvalPrompt = async (interviewId: string) => {
  const answers = await answerService.fetchAnswers(interviewId, true);
  const answersSummary = generateAnswersSummary(answers);

  return `Those are questions of the interview and answers of the condidate:
  
  ${answersSummary}
   
   Evaluate the condidate answers like this example (in this example all answers are merged into one report, do the same) and give to me in the same format in json (like below)
   
   the first <li> represents strentgts (5 max)
   the second <li> represents weaknesses (5 max)
   the third <li> represents suggestions for improvement (5 max)
   
   notes:
   - ignore grammar errors
   
   EXAMPLE RESUT:
      {
        "strengths": [
          "Candidate has relevant experience in software engineering and working on innovative projects",
          "Demonstrates a proactive approach to learning and seeking feedback",
          "Asks thoughtful questions about company culture and the ideal candidate for the position"
        ],
        "weaknesses": [
          "Occasionally jumps between different topics and experiences, leading to a lack of clarity in responses",
          "Could work on providing more specific and concise answers to interview questions",
          "Salary expectation could be more research-based and tailored to the company and role"
        ],
        "improvementSuggestions": [
          "Practice structuring responses to provide clear and concise information",
          "Research and align salary expectations with the industry standards and the specific company",
          "Continue asking relevant and insightful questions, while also actively listening and engaging in conversation with the interviewer"
        ]
      }
   `;
};
