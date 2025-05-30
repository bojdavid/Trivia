
  export interface Subject {
    name: string;
    id?: number;
  }

//let selectCategory: boolean = $state(false);

export const changingVariables = $state({
	selectQuestionRange: false,
  subjectData: null

});

export const startQuiz = (subject : string, category: string[], questionsRange : number) =>{
        let quizMeta = {
      subject: subject,
      category: category,
      noOfQuestions: questionsRange,
    };
    //setQuizMeta(quizMeta);
    }

export const selectSubject = async (selectedSubject : Subject) => {
    // Check if selectedSubject is empty
    if (selectedSubject == undefined) {
      console.log("Please select a subject");
    } else {
      changingVariables.selectQuestionRange = true;
      //console.log("Question range in seslectsubj func --- ", changingVariables.selectQuestionRange)
      changingVariables.subjectData = await getQuestionCount(selectedSubject);
    
    }
  };

export const getSubjects = (subjects: any)=>{
  return fetch("https://opentdb.com/api_category.php")
    .then((res) => res.json())
    .then((data) => (subjects = data.trivia_categories)); 
  }

const getQuestionCount = (selectedSubject: any) =>{
 return fetch(`https://opentdb.com/api_count.php?category=${selectedSubject.id}`)
        .then((res) => res.json())
}

export const getQuestions = () => {

}