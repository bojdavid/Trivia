import type { PageLoad } from './$types';
import { questions } from './data.js';


// -------------------------------------------------------
// 1. Interface (unchanged)
interface QuizQuestion {
  ID: number;
  Question: string;
  CorrectOption: string;   // ← keeps the ANSWER TEXT, not "OptionA" etc.
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

// -------------------------------------------------------
// 2. Helper – Fisher–Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// -------------------------------------------------------
// 3. Main transformer
function randomiseOptions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map(q => {
    // Put correct + incorrect answers in one list
    const opts = shuffle([
      q.CorrectOption,
      q.OptionA,
      q.OptionB,
      q.OptionC,
      q.OptionD
    ]);

    // Remove duplicates that might arise if OptionA already == CorrectOption
    const uniqueOpts = Array.from(new Set(opts));

    // Pad back to 4 (rare case) by re-adding incorrect ones
    while (uniqueOpts.length < 4) {
      const filler = [q.OptionA, q.OptionB, q.OptionC, q.OptionD]
        .find(x => !uniqueOpts.includes(x))!;
      uniqueOpts.push(filler);
    }

    // Reassign to OptionA-D in new order
    return {
      ...q,
      OptionA: uniqueOpts[0],
      OptionB: uniqueOpts[1],
      OptionC: uniqueOpts[2],
      OptionD: uniqueOpts[3]
      // q.CorrectOption stays the same (answer text),
      // but may now be in A, B, C or D position
    };
  });
}


export const load: PageLoad = async ({ fetch, params })  => {
	const shuffledQuestions = randomiseOptions(questions);
    
    return {
			questions: shuffledQuestions,
			//apiQuestions : ques
		};
	
};