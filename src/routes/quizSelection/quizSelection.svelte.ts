import { goto } from "$app/navigation";
import { getQuestionCount } from "$lib/api/question";

export interface Subject {
  name: string;
  id: number;
}

class QuizSelectionState {
  selectQuestionRange = $state(false);
  selectedQuestionRange = $state(10);
  selectedSubject = $state<Subject>({ name: "", id: 0 });
  subjectData = $state<Promise<any> | null>(null);

  startQuiz = () => {
    goto("./quiz");
  };

  selectSubject = (subject: Subject) => {
    if (!subject || !subject.name) {
      alert("Please select a subject");
    } else {
      this.selectedSubject = subject;
      this.selectQuestionRange = true;
      this.subjectData = getQuestionCount(subject);
    }
  };

  reset = () => {
    this.selectQuestionRange = false;
    this.selectedQuestionRange = 10;
    this.selectedSubject = { name: "", id: 0 };
    this.subjectData = null;
  };
}

export const quizSelectionState = new QuizSelectionState();
