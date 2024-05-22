export type ReplayRecording = {
  path: string;
  duration: number;
  server:string
};

export interface CreateAnswerDto {
  audioUrl: string;
  transcript: string;
  feedback: object;
  userId: string | null;
  interviewId: string;
  questionId: string;
}

export interface UpdateAnswerDto {
  id:string;
  interviewId?: string;
  questionId?: string;
  audioUrl?: string;
  transcript?: string;
  feedback?: object;
  userId?: string | null;
  replayRecording?: ReplayRecording;
}
