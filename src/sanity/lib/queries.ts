import { sanityClient } from "sanity:client";
import { sanity } from "./sanity";

// 🟢 Obtener todas las canciones
export async function getSongs() {
  return await sanity.fetch(`
    *[_type == "song"]{
      _id,
      title,
      language->{
    name, // 👈 aquí traes el nombre del idioma (por ejemplo Español, Inglés)
  },
      artists[]->{
        _id,
        name,
        image
      },
      "genres": genres[]-> { name }, // ✅ importante
    }
  `);
}

// 🟢 Obtener todos los artistas
export async function getArtists() {
  return await sanity.fetch(`
    *[_type == "artist"]{
      _id,
      name,
      slug,
      image,
      bio
    }
  `);
}

// 🟢 Obtener todos los géneros
export async function getGenres() {
  return await sanity.fetch(`
    *[_type == "genre"]{
      _id,
      name,
      description
    }
  `);
}

// 🟢 Obtener todos los idiomas
export async function getLanguages() {
  return await sanity.fetch(`
    *[_type == "language"]{
      _id,
      name,
      code
    }
  `);
}


export async function getTables() {
  const query = `*[_type == "table" && active == true] | order(name asc) {
    _id,
    "name": coalesce(name, numero, "Mesa")
  }`;
  return (await sanityClient.fetch(query)) ?? [];
}

export async function getMenuCategories() {
  return await sanity.fetch(`
    *[_type == "menuCategory"]{
      _id,
      name,
      icon
    }
  `);
}

export async function getMenuItems() {
  return await sanity.fetch(`
    *[_type == "menuItem"]{
      _id,
      name,
      description,
      price,
      image,
      category->{

        _id,
        name,
        icon
      },
      available
    }
  `);
}

export async function getCoupons() {
  return await sanity.fetch(`
    *[_type == "coupon"]{
      _id,
      code,
      benefit,
      durationMinutes,
      active
    }
  `);
}