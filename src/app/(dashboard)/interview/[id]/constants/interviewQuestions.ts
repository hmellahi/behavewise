import { interviewQuestion } from "../types/Interview";

const interviewQuestions: interviewQuestion[] = [
  {
    id: "2",
    videoUrl:
      "https://res.cloudinary.com/dv2xxj5vi/video/upload/v1713049246/interview/tx8n35le99lt1d33ohzp.mp4",
    caption:
      "Tell me about yourself. Why don't you walk me through your resume?",
    prompt:
      "Please also give feedback on the candidate's communication skills. Make sure their response is structured (perhaps using the STAR or PAR frameworks).",
  },
  {
    id: "1",
    videoUrl:
      "https://res.cloudinary.com/dv2xxj5vi/video/upload/f_auto:video,q_auto/ejqd1ksxpbbf2lwpk7le",
    caption:
      "What’s an example of a difficult problem you solved? Be specific about how the problem was diagnosed and your process for approaching it.",
    prompt:
      "Please also give feedback on the candidate's communication skills.",
  },
  {
    id: "3",
    videoUrl:
      "https://res.cloudinary.com/dv2xxj5vi/video/upload/v1712201664/interview/ypzwd3hdffkrxs4qox7q.mp4",
    caption: "So, why are you interested in joining our company?",
    prompt:
      "Please also give feedback on the candidate's communication skills.",
  },
];

export default interviewQuestions;
