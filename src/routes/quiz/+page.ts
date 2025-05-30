import type { PageLoad } from './$types';
import { questions } from './data.js';
import { changingVariables } from '../quizSelection/quizSelection.svelte';

export const load: PageLoad = ({ params }) => {
	console.log(changingVariables)
    return {
		questions: questions
	};
};