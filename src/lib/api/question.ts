export const getSubjects_ = (subjects: any)=>{
  return fetch("https://opentdb.com/api_category.php")
    .then((res) => res.json())
    .then((data) => (subjects = data.trivia_categories)); 
  }
export const getSubjects = async (subjects:any): Promise<any> => {
  try {
    console.log("Get Subjects");
    const response = await fetch("https://opentdb.com/api_category.php")

    if (!response.ok) {
      // Check if the response has a text body
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    // Check if the response is valid JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Invalid response type: ${contentType}, body: ${text}`);
    }

    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error; // Re-throw the error to handle it upstream if needed
  }
};

export const getQuestionCount = async (selectedSubject: { name: string; id: number }): Promise<any> => {
  try {
    console.log("Fetching question count for subject:", selectedSubject.name);
    const response = await fetch(`https://opentdb.com/api_count.php?category=${selectedSubject.id}`);

    if (!response.ok) {
      // Check if the response has a text body
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    // Check if the response is valid JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Invalid response type: ${contentType}, body: ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching question count:", error);
    throw error; // Re-throw the error to handle it upstream if needed
  }
};

export const getQuestions = () => {

}