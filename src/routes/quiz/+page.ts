import type { PageLoad } from './$types';
import { questions } from './data.js';
import { get } from "svelte/store";
import { changingVariables } from '../quizSelection/quizSelection.svelte';

export const ssr = false;



export const load: PageLoad = ({ params }) => {
	const quizMeta = get(changingVariables)
	console.log("quiz, page.ts file --------", quizMeta)


	//let response = fetch(`https://opentdb.com/api.php?category=${}amount=50&type=multiple`)

	const getQuestions = async () =>{
		
	}

    return {
		questions: questions
	};
};