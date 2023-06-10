function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      } catch (erro) {
        return manejaErro(erro);
      }
    })
  );
  return arrStatus;
}

// async function checaStatus(listaURLs) {
//   const arrStatus = await Promise.all(
//     listaURLs.map(async (url) => {
//       const response = await fetch(url);
//       return response.status;
//     })
//   );
//   return arrStatus;
// }

function manejaErro(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "Link não encontrado";
  } else {
    return "Algo deu errado";
  }
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);
  return listaDeLinks.map((objeto, index) => ({
    ...objeto,
    status: status[index],
  }));
}

// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }
