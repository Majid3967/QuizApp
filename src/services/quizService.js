

export const getCategories =  async () =>  {
    let res =  await fetch("https://opentdb.com/api_category.php");
    return res.json();
}

export const getQuestionsByCategories =  async (categoryId,difficultyLevel) =>  {
    // Difficulty Level: easy, medium, hard
    let res =  await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficultyLevel}&type=multiple`);
    return res.json();
}
