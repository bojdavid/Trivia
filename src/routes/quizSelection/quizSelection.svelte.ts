  export interface Subject {
    name: string;
    id?: number;
  }

let selectCategory: boolean = $state(false);

export const startQuiz = (subject : string, category: string[], questionsRange : number) =>{
        let quizMeta = {
      subject: subject,
      category: category,
      noOfQuestions: questionsRange,
    };
    //setQuizMeta(quizMeta);
    }

export const selectSubject = (selectedSubject : Subject): void => {
    // Check if selectedSubject is empty
    if (selectedSubject == undefined) {
      console.log("Please select a subject");
    } else {
      selectCategory = true;
    }
  };