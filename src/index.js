import chalk from "chalk";
import fs from "fs";

// const textoTeste = "São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).";

// Trabalhando com regex usando metodos do objeto String
// function extraiLinks(texto) {
//   const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
//   const links = texto.match(regex);
//   console.log(links);
// }

// Trabalhando com regex usando metodos do objeto RegExp
// function extraiLinks(texto) {
//   const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
//   const links = regex.exec(texto);
//   console.log(links);
// }

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const links = [...texto.matchAll(regex)];
  const resultados = links.map((link) => ({
    [link[1]]: link[2],
  }));
  return resultados.length !== 0 ? resultados : "Não há links no arquivo";
}

// extraiLinks(textoTeste);

// Trabalhando com regex podemos usar // ou new RegExp()
// const regex1 = /[a-zA-z\s]/;
// let regex2 = new RegExp("[a-zA-z\s]");

function trataErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, "Não há arquivo no diretório"));
}

// Função assíncrona com async/wait
async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

export default pegaArquivo;

// Função assíncrona com then
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto)=> console.log(chalk.green(texto)))
//         .catch(trataErro) // (erro=> trataErro(erro))
// }

// Função síncrona
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto)=>{
//         if(erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

// pegaArquivo("./arquivos/texto.md");

// \[[^[\]]*?\]
// \(https?:\/\/[^\s?#.].[^\s]*\)
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
