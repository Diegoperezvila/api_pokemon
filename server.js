const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
const PORT = 3000;

// URLs de las páginas de scraping
const URL_EVOLUCIONES_PRISMATICAS = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Evoluciones_Prism%C3%A1ticas";
const URL_CHISPAS_FULGRULANTES = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Chispas_Fulgurantes";
const URL_CORONA_ASTRAL = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Corona_Astral";
const URL_FABULA_SOMBRIA = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_F%C3%A1bula_Sombr%C3%ADa";
const URL_MASCARADA_CREPUSCULAR = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Mascarada_Crepuscular";
const URL_FUERZAS_TEMPORALES = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Fuerzas_Temporales";
const URL_DESTINOS_PALDEA = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Destinos_de_Paldea";
const URL_BRECHA_PARADOJICA = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Brecha_Parad%C3%B3jica";
const URL_151 = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_151";
const URL_LLAMAS_OBSIDIANAS = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Llamas_Obsidianas";
const URL_EVOLUCIONES_PALDEA = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Evoluciones_en_Paldea";
const URL_ESCARLATA_PURPURA = "https://www.wikidex.net/wiki/Escarlata_y_P%C3%BArpura_(TCG):_Escarlata_y_P%C3%BArpura";

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
        res.json("SCRAPING POKEMON");
});

app.get("/evoluciones-prismaticas", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_EVOLUCIONES_PRISMATICAS).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_180
        const imagesData = [];
        for (let i = 1; i <= 180; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/es-es/SV8pt5_ES_${i}.png`;
            const cardName = `PRE${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/chispas-fulgrulantes", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_CHISPAS_FULGRULANTES).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_252
        const imagesData = [];
        for (let i = 1; i <= 252; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_${i}.png`;
            const cardName = `SSP${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/corona-astral", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_CORONA_ASTRAL).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_175
        const imagesData = [];
        for (let i = 1; i <= 175; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/stellar-crown/es-es/SV07_ES_${i}.png`;
            const cardName = `SCR${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/fabula-sombria", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_FABULA_SOMBRIA).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_99
        const imagesData = [];
        for (let i = 1; i <= 99; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/shrouded-fable/es-es/SV6pt5_ES_${i}.png`;
            const cardName = `SFA${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/mascarada-crepuscular", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_MASCARADA_CREPUSCULAR).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_226
        const imagesData = [];
        for (let i = 1; i <= 226; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/twilight-masquerade/es-es/SV06_ES_${i}.png`;
            const cardName = `TWM${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/fuerzas-temporales", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_FUERZAS_TEMPORALES).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_218
        const imagesData = [];
        for (let i = 1; i <= 218; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/temporal-forces/es-es/SV05_ES_${i}.png`;
            const cardName = `TEF${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/destinos-paldea", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_DESTINOS_PALDEA).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_245
        const imagesData = [];
        for (let i = 1; i <= 245; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/paldean-fates/es-es/SV4pt5_ES_${i}.png`;
            const cardName = `PAF${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/brecha-paradojica", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_BRECHA_PARADOJICA).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_266
        const imagesData = [];
        for (let i = 1; i <= 266; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/paradox-rift/es-es/SV04_ES_${i}.png`;
            const cardName = `PAR${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/151", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_151).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_207
        const imagesData = [];
        for (let i = 1; i <= 207; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/es-es/SV3pt5_ES_${i}.png`;
            const cardName = `MEW${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/llamas-obsidianas", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_LLAMAS_OBSIDIANAS).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_230
        const imagesData = [];
        for (let i = 1; i <= 230; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/obsidian-flames/es-es/SV03_ES_${i}.png`;
            const cardName = `OBF${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/evoluciones-paldea", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_EVOLUCIONES_PALDEA).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_279
        const imagesData = [];
        for (let i = 1; i <= 279; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/paldea-evolved/es-es/SV02_ES_${i}.png`;
            const cardName = `PAL${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

app.get("/escarlata-purpura", async (req, res) => {
    try {
        // Obtener las cartas desde Wikidex
        const cardsData = await axios.get(URL_ESCARLATA_PURPURA).then(response => {
            const $ = cheerio.load(response.data);
            let cards = [];

            $("table.wiki.sortable tbody tr").each((index, element) => {
                const columns = $(element).find("td");

                if (columns.length >= 5) {
                    const name = $(columns[1]).find("a").text().trim(); // Nombre de la carta
                    const type = $(columns[2]).find("img").attr("alt") || $(columns[2]).text().trim(); // Tipo de la carta
                    const rarity = $(columns[4]).find("img").attr("alt") || $(columns[4]).text().trim(); // Rareza de la carta

                    if (name && type && rarity) {
                        cards.push({ name, type, rarity });
                    }
                }
            });

            return cards;
        });

        // Crear la lista de imágenes desde ES_1 hasta ES_258
        const imagesData = [];
        for (let i = 1; i <= 258; i++) {
            const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/scarlet-violet/es-es/SV01_ES_${i}.png`;
            const cardName = `SVI${i.toString().padStart(3, '0')}`;
            imagesData.push({ number: cardName, image: imageUrl });
        }

        // Combinar los datos de cartas con las imágenes basándonos en el índice
        const combinedData = cardsData.map((card, index) => {
            const image = imagesData[index]; // Usar el índice para acceder a la imagen
            if (image) {
                return { ...card, number: image.number, image: image.image }; // Combinar la carta con la imagen
            }
            return null;
        }).filter(card => card !== null); // Eliminar los resultados que no tienen imagen

        // Devolver los datos combinados
        res.json(combinedData); // Devolver las cartas con imágenes combinadas
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cartas combinadas" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
