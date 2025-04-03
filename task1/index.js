import "dotenv/config";
import { program } from "commander";
import inquirer from "inquirer";
import { capitalizeFirstLetter, asyncForEach } from "./helpers.js";
import { searchBook, getBookAuthors, DEFAULT_TTL, CLEAN_EXPIRED_CACHE_INTERVAL } from "./booksApi.js";

const getBookInfo = async ({ title } = {}) => {
  if (!title) {
    console.log("Title is required");
    return;
  }

  // Clean the title to be used for the search
  const cleanTitle = title
    .trim()
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");

  // Search for the book by title
  const results = await searchBook(cleanTitle);
  if (results.error) {
    console.log(results.error);
    return;
  }

  // Get Authors if available
  let authorsList = [];
  if (results?.authors.length > 0) {
    await asyncForEach(results.authors, async (authorId) => {
      const authorData = await getBookAuthors(authorId);
      const { firstName, lastName, middleInitial, error } = authorData || {};
      if (error) {
        console.log(error);
        return; // Skip this iteration if there is an error fetching the author data
      }

      let authorFullName = "";
      if (firstName) {
        authorFullName += firstName;
      }
      if (middleInitial) {
        authorFullName += ` ${middleInitial}`;
      }
      if (lastName) {
        authorFullName += ` ${lastName}`;
      }
      if (authorFullName) {
        authorsList.push(authorFullName);
      }
    });
  }

  // Display the book info for the user to see
  let bookInfo = `${results.title}, ${results.description}`;
  if (authorsList.length > 0) {
    bookInfo += `, ${authorsList.join(", ")}`;
  }
  console.log(bookInfo);
};

program
  .command("book search")
  .description("Search for a book by title")
  .action(async () => {
    console.log(`Default TTL: ${DEFAULT_TTL / 1000} seconds`);
    console.log(`Clean expired cache interval: ${CLEAN_EXPIRED_CACHE_INTERVAL / 1000} seconds\n`);
    while (true) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of a book to search for:",
        },
      ]);
      await getBookInfo(answer);
    }
  });

program.parse(process.argv);
