import chalk from "chalk";
import fs from "fs";
import listaValidada from "./http-validacao.js";
import pegaArquivo from "./index.js";

const argumentos = process.argv;

async function imprimeLista(valida, resultado, identificador = "") {
  if (valida) {
    console.log(
      chalk.white.bgGreen("lista validada"),
      chalk.black.bgGreen(identificador),
      await listaValidada(resultado)
    );
  }
  console.log(
    chalk.yellow("lista de links"),
    chalk.black.bgGreen(identificador),
    resultado
  );
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === "--valida";

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log(chalk.red("O arquivo ou diretório não existe"));
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(argumentos[2]);
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (arquivo) => {
      const resultado = await pegaArquivo(`${caminho}/${arquivo}`);
      imprimeLista(valida, resultado, arquivo);
    });
  }
}

processaTexto(argumentos);

// const argumentos = process.argv;

// async function processaTexto(argumentos) {
//   const caminho = argumentos[2];
//   if (fs.lstatSync(caminho).isFile()) {
//     const resultado = await pegaArquivo(argumentos[2]);
//     console.log(chalk.yellow("lista de links"), resultado);
//   } else if (fs.lstatSync(caminho).isDirectory()) {
//     const arquivos = await fs.promises.readdir(caminho);
//     arquivos.forEach(async (arquivo) => {
//       const resultado = await pegaArquivo(`${caminho}/${arquivo}`);
//       console.log(chalk.blue("caminho do arquivo"), `${caminho}/${arquivo}`);
//       console.log(chalk.magenta("lista de links"), resultado);
//     });
//     console.log(chalk.blue("lista de arquivos"), arquivos);
//   }
// }

// processaTexto(argumentos);

// const caminho = process.argv;

// async function processaTexto(caminho) {
//   const resultado = await pegaArquivo(caminho[2]);
//   console.log(chalk.yellow("lista de links"), resultado);
// }

// processaTexto(caminho);
