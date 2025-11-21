  import { goto } from "$app/navigation";
  import { writable, get } from 'svelte/store';
  import { getQuestionCount } from "$lib/api/question";


  export interface Subject {
    name: string;
    id?: number; 
  }


//let selectCategory: boolean = $state(false);

interface ChangingVariable {
  selectQuestionRange: boolean;
  subjectData: Promise<any>;
  selectedQuestionRange: number;
  selectedSubject: { name: string; id: number };
}

// Function to create a new Promise
const newPromise = new Promise((resolve) => {
  //getQuestionCount(selectedSubject)
  // Simulate asynchronous data fetching
  console.log("the changing variables data is ")
  setTimeout(() => {
    resolve({ data: 'Some data' });
  }, 1000);
});

// Initial value for the store
const initialValue: ChangingVariable = {
  selectQuestionRange: false,
  subjectData: newPromise,
  selectedQuestionRange: 10,
  selectedSubject: { name: "", id: 0 }
};


// Create the writable store
export const changingVariables = writable<ChangingVariable>(initialValue);

export const startQuiz = () =>{
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

