  import { goto } from "$app/navigation";
  import { writable, get } from 'svelte/store';


  export interface Subject {
    name: string;
    id?: number; 
  }

  interface QuestionsData {total_question_count: number, total_easy_question_count: number, total_medium_question_count: number, total_hard_question_count: number}

//let selectCategory: boolean = $state(false);

export const changingVariables = writable({
	selectQuestionRange: false,
  subjectData: new Promise(() => {}),
  selectedQuestionRange : 0,
  selectedSubject: {name:"", id:0}
});


export const startQuiz = () =>{
  /*      
  let quizMeta = {
                subject: changingVariables.selectedSubject.name,
                id: changingVariables.selectedSubject.id,
                noOfQuestions: changingVariables.selectedQuestionRange,
        };
    //setQuizMeta(quizMeta);
    console.log(quizMeta)
    */
    goto('./quiz');
    }

export const selectSubject = async (selectedSubject :any) => {
    // Check if selectedSubject is empty
    if (selectedSubject == undefined) {
      alert("Please select a subject");
    } else {
      const current = get(changingVariables);

      changingVariables.set({
        ...current,
        selectQuestionRange: true,
        selectedSubject,
        subjectData: getQuestionCount(selectedSubject)
      });
    
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