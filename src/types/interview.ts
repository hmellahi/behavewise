export interface CreateAnswerDto {
  audioUrl: string;
  transcript: string;
  feedback: object;
  userId: string | null;
  interviewId: string;
  questionId: string;
}
