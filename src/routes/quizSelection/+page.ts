import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const startQuiz = (subject : string, category: string[], questionsRange : number) =>{
        let quizMeta = {
      subject: subject,
      category: category,
      noOfQuestions: questionsRange,
    };
    //setQuizMeta(quizMeta);
    }

    return {
        startQuiz,
        h:"this is h"
    }

}
