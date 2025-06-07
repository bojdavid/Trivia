import type { PageLoad } from './$types';
import { questions, apiData } from './data.js';
import { get } from "svelte/store";
import { changingVariables } from '../quizSelection/quizSelection.svelte';
import { goto } from '$app/navigation';

export const ssr = false;

interface QuizQuestion {
  ID: number;
  Question: string;
  CorrectOption: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  AnswerExplanation?: string;
  Category: string;
  answered?: boolean;
  view_correct_ans?: boolean;
  choice?: string;
  id?: number;
}

function transformToQuizQuestions(apiResponse: any): QuizQuestion[] {
  const results = apiResponse.results;

  return results.map((item: any, index: number): QuizQuestion => {
    // combine and shuffle options
    const allOptions = [...item.incorrect_answers, item.correct_answer];
    const shuffled = shuffleArray(allOptions);

    return {
      ID: index + 1,
      Question: decodeHtml(item.question),
      CorrectOption: optionKey(shuffled, item.correct_answer),
      OptionA: shuffled[0],
      OptionB: shuffled[1],
      OptionC: shuffled[2],
      OptionD: shuffled[3],
      Category: decodeHtml(item.category),
      answered: false,
      view_correct_ans: false
    };
  });
}

// Shuffle helper
function shuffleArray(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}

// Get the key name (OptionA, OptionB, etc.) for the correct answer
function optionKey(options: string[], correct: string): string {
  const index = options.indexOf(correct);
  return ['A', 'B', 'C', 'D'][index];
}

// HTML decoder (because questions/answers have &quot;, etc.)
function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export const load: PageLoad = async ({ fetch, params })  => {

	let data : any= [];
	let ques

	
	const quizMeta = get(changingVariables)

	if(!quizMeta.selectQuestionRange){
		return goto("/quizSelection")
	}
		const response = await fetch(`https://opentdb.com/api.php?category=${quizMeta.selectedSubject.id}&amount=20&type=multiple`)
		if(response.ok){

			 ques = await response.json()
			 if(ques.response_code != 0){
				 alert("error in the response")
			 }
			 else{
				 data = transformToQuizQuestions(ques)
			 }
		}

	
	//data = transformToQuizQuestions(apiData)
		
		return {
			questions: data,
			//apiQuestions : ques
		};
	
	

};