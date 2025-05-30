
  export interface Subject {
    name: string;
    id?: number; 
  }

  interface QuestionsData {total_question_count: number, total_easy_question_count: number, total_medium_question_count: number, total_hard_question_count: number}

//let selectCategory: boolean = $state(false);

export const changingVariables = $state({
	selectQuestionRange: false,
  subjectData: Promise<any>,
  selectedQuestionRange : 0,
  selectedSubject: {name:"", id:0}
});

export const startQuiz = () =>{
        let quizMeta = {
      subject: changingVariables.selectedSubject.name,
      id: changingVariables.selectedSubject.id,
      noOfQuestions: changingVariables.selectedQuestionRange,
    };
    //setQuizMeta(quizMeta);
    console.log(quizMeta)
    }

export const selectSubject = async (selectedSubject :any) => {
    // Check if selectedSubject is empty
    if (selectedSubject == undefined) {
      console.log("Please select a subject");
    } else {
      changingVariables.selectQuestionRange = true;
      console.log(" From here----")
      changingVariables.selectedSubject = selectedSubject
      changingVariables.subjectData = await getQuestionCount(selectedSubject);
      console.log($state.snapshot(changingVariables.subjectData))
    
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