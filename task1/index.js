import "dotenv/config";
import { program } from "commander";
import inquirer from "inquirer";
import { searchBook } from "./booksApi.js";
import { capitalizeFirstLetter } from "./helpers.js";

const main = async ({ title } = {}) => {
  const cleanTitle = title
    .trim()
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");

  const results = await searchBook(cleanTitle);
  if (results.error) {
    console.log(results.error);
    return;
  }

  let bookInfo = `${results.title}, ${results.description}`;

  // Get Authors if available
  let authorsList = [];
  if (results?.authors.length > 0) {
    // @todo_cc
    console.log("authors", results.authors);
  }

  if (authorsList.length > 0) {
    bookInfo += `, ${authorsList.join(", ")}`;
  }

  console.log(bookInfo);
};

program
  .command("book search")
  .description("Search for a book by title")
  .action(async () => {
    while (true) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of a book to search for:",
        },
      ]);
      await main(answer);
    }
  });

program.parse(process.argv);
