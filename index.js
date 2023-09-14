// let quotes = [
//   {
//     quote: "algunas citas A",
//     author: "author A",
//   },
//   {
//     quote: "algunas citas B",
//     author: "author B",
//   },
//   {
//     quote: "algunas citas C",
//     author: "author C",
//   },
//   {
//     quote: "algunas citas D",
//     author: "author D",
//   },
// ];

let quotes = [];

const API_URL = "https://type.fit/api/";

let quote = '';
let author = ''; 

const contenedor = document.querySelector(".contenedor");

const stringToHtmlParser = ({ ...props }) => {
  console.log(props.templateID);
  const stringElement = document.getElementById(props.templateID).innerHTML;
  const parser = new DOMParser();
  return [...parser.parseFromString(stringElement, "text/html").body.children];
};

const fetchData = async ({ ...props }) => {
  const response = await fetch(props.url);
  quotes = await response.json();
  console.log(quotes);

  contenedor.removeChild(document.querySelector('.contenedor h1'))
  let laadingTemplatesElems = stringToHtmlParser({ templateID: "loaded-content" });
  laadingTemplatesElems[3].addEventListener("click", (e) => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteNode = document.querySelector("#quote");
    const authorNode = document.querySelector("#author");
    quoteNode.innerText = quotes[quoteIndex].text;
    authorNode.innerText = quotes[quoteIndex].author;
  });
  laadingTemplatesElems.forEach((item) => contenedor.appendChild(item));
  
};

window.onload = () => {
  contenedor.appendChild(
    stringToHtmlParser({ templateID: "loading-content" })[0]
  );
  fetchData({ url: `${API_URL}/quotes` });  
};
